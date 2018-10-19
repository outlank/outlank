from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
import requests
import base64
import json
import jwt
import time
import datetime
from django.conf import settings
from django.contrib.auth.models import User, Group
from django.contrib.auth import login as contrib_login
from django.shortcuts import redirect


def login(request):
    ''' Server side login.
    '''
    host = request.scheme + '://' + request.META['HTTP_HOST']
    next = request.GET.get('next', '/admin/')
    request.session['next'] = next
    redirect_uri = host + '/auth/callback'
    server_client_id = settings.SERVER_CLIENT_ID
    return redirect('https://login.xxx.com/connect/authorize?response_type=code&scope=openid fullname nickname email&client_id=' +
                    server_client_id + '&state=af0ifjsldkj&redirect_uri=' + redirect_uri)


def callback(request):
    server_client_id = settings.SERVER_CLIENT_ID
    server_client_secret = settings.SERVER_CLIENT_SECRET
    # host = request.scheme + '://0.0.0.0:8000'  # FOR LOCAL DEBUG
    host = request.scheme + '://' + request.META['HTTP_HOST']
    redirect_uri = host + '/auth/callback'

    token_data = _get_oauth_token(request.GET['code'], server_client_id, server_client_secret, redirect_uri)

    if not 'id_token' in token_data.keys() or not _valid_id_token(token_data['id_token'], server_client_id, server_client_secret):
        return HttpResponse('认证失败，请联系系统管理员！', status=500)

    ret_data = _get_user_info(token_data['access_token'])

    fullname = ret_data['fullname']
    nickname = ret_data['nickname']
    email = ret_data['email']

    user = _get_or_create_user(fullname, nickname, email)
    contrib_login(request, user)
    return redirect(request.session.get('next', '/admin/'))


def token(request):
    '''客户端获取jwt接口

    1. 从openid获取token
    2. 校验token
    3. 使用token获取用户信息
    '''
    client_id = settings.CLIENT_ID
    client_secret = settings.CLIENT_SECRET

    token_data = _get_oauth_token(
        json.loads(request.body.decode())['code'], client_id, client_secret, 'http://10.0.75.1:8080/auth_callback')

    if not 'id_token' in token_data.keys() or not _valid_id_token(token_data['id_token'], client_id, client_secret):
        return JsonResponse(data={'success': False}, status=500)

    ret_data = _get_user_info(token_data['access_token'])

    fullname = ret_data['fullname']
    nickname = ret_data['nickname']
    email = ret_data['email']

    user = _get_or_create_user(fullname, nickname, email)
    token = _get_jwt(user)
    return JsonResponse(data={'token': token})


def _get_oauth_token(code, client_id, client_secret, redirect_uri):
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
        'client_id': client_id,
        'client_secret': client_secret
    }

    r = requests.post('https://login.xxx.com/connect/token', data=data)
    ret_data = json.loads(r.text)

    return ret_data


def _get_user_info(access_token):
    headers = {'Authorization': 'Bearer ' + access_token}

    r = requests.get('https://login.xxx.com/connect/userinfo', headers=headers)
    ret_data = json.loads(r.text)

    return ret_data


def _get_or_create_user(fullname, nickname, email):
    us = User.objects.filter(email=email)

    if us.count() > 0:
        u = us.first()
        default_group = Group.objects.filter(name='组内游客').first()
        if default_group:
            u.groups.add(default_group)
        u.is_staff = True
        u.first_name = fullname
        u.last_name = fullname
        u.username = nickname
        u.save()
    else:
        u = User.objects.create_user(nickname, email, password='G91titan#@!')
        default_group = Group.objects.filter(name='组内游客').first()
        if default_group:
            u.groups.add(default_group)
        u.is_staff = True
        u.first_name = fullname
        u.last_name = fullname
        u.save()

    return u


def _get_jwt(user):
    token = jwt.encode({
        'username': user.username,
        'first_name': user.first_name,
        'email': user.email,
        'iat': datetime.datetime.utcnow(),
        'nbf': datetime.datetime.utcnow() + datetime.timedelta(minutes=-5),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, settings.SECRET_KEY)

    return token.decode()


def _valid_id_token(id_token, client_id, client_secret):
    payload = jwt.decode(id_token, client_secret, algorithms=['HS256'], audience=client_id)

    if not payload['iss'] == 'https://login.xxx.com/connect':
        print(1)
        return False

    if not payload['aud'] == client_id:
        print(2)
        return False

    if not payload['exp'] >= time.time():
        print(3)
        return False

    if not time.time() - payload['iat'] <= 300:
        print(4)
        return False

    return True