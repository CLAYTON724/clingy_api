#!/bin/bash

echo "Installing Django dependencies..."
pip install django djangorestframework django-cors-headers

echo "Running Django migrations..."
python manage.py migrate

echo "Starting Django development server..."
python manage.py runserver 0.0.0.0:8000
