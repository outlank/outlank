FROM python
WORKDIR /code
COPY . /code
RUN pip install -r requirements.txt
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN dpkg-reconfigure -f nointeractive tzdata
RUN ["chmod", "+x", "entrypoint.sh"]
