#!/usr/bin/env python
import os
import sys
import subprocess

# Change to the project root
os.chdir('/vercel/share/v0-project')

print("[Backend Setup] Installing Django dependencies...")
subprocess.run([sys.executable, '-m', 'pip', 'install', 'django', 'djangorestframework', 'django-cors-headers'], check=True)

print("\n[Backend Setup] Running database migrations...")
subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)

print("\n[Backend Setup] Starting Django development server on port 8000...")
print("[Backend Setup] Server will be available at http://localhost:8000")
print("[Backend Setup] API endpoints: http://localhost:8000/api/")
print("\n" + "="*60)
subprocess.run([sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'])
