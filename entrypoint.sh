#!/bin/sh

cp ./backend/env/.env.production ./backend/.env
pip install -r requirements.txt
# python manage.py makemigrations --no-input # no make migrations in deployment
python manage.py migrate --no-input
python manage.py collectstatic --no-input
gunicorn backend.wsgi -b 0.0.0.0:8000 --access-logfile ./log/gunicorn/access.log --error-logfile ./log/gunicorn/error.log --capture-output --enable-stdio-inheritance