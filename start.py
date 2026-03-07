#!/usr/bin/env python
"""
Simple script to start both Django backend and Next.js frontend
"""
import os
import sys
import subprocess
import time
import platform

def main():
    print("\n" + "="*70)
    print("CLINGY API - HR PORTAL - STARTING SERVICES")
    print("="*70 + "\n")
    
    # Install Django and required packages
    print("Installing Python dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "django", "djangorestframework", "django-cors-headers"], check=False)
    
    # Run migrations
    print("Running database migrations...")
    subprocess.run([sys.executable, "manage.py", "migrate", "--run-syncdb"], check=False)
    
    print("\nInstalling frontend dependencies...")
    subprocess.run(["npm", "install"], cwd="frontend", check=False)
    
    print("\n" + "="*70)
    print("STARTING SERVICES")
    print("="*70 + "\n")
    
    # Start Django backend in background
    print("Starting Django Backend on http://localhost:8000")
    backend_proc = subprocess.Popen([sys.executable, "manage.py", "runserver", "0.0.0.0:8000"])
    
    # Wait for backend to start
    time.sleep(3)
    
    # Start Next.js frontend
    print("Starting Next.js Frontend on http://localhost:3000\n")
    frontend_proc = subprocess.Popen(["npm", "run", "dev"], cwd="frontend")
    
    print("="*70)
    print("Both services are running!")
    print("Backend API: http://localhost:8000/api/")
    print("Frontend: http://localhost:3000")
    print("="*70 + "\n")
    
    try:
        # Keep both processes running
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\n\nShutting down services...")
        backend_proc.terminate()
        frontend_proc.terminate()
        backend_proc.wait()
        frontend_proc.wait()
        print("Services stopped.")

if __name__ == "__main__":
    main()
