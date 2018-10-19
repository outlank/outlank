from django.shortcuts import render
from django.http import HttpResponse
import logging
from django.contrib.auth import login as contrib_login
from django.contrib.auth.models import User
from django.shortcuts import redirect


def log(request):
    # a = request.scheme
    # print(a)
    # logger = logging.getLogger('app-debug')
    # logger.debug(a)
    # return HttpResponse('123')
    user = User.objects.filter(id__exact=3).first()
    contrib_login(request, user)
    return redirect('/admin/')
