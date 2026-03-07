#!/usr/bin/env python3
import subprocess
import sys
import os
import time
import threading

def install_dependencies():
    """Install all dependencies"""
    print("\n" + "="*70)
    print("INSTALLING DEPENDENCIES")
    print("="*70)
    
    # Install Django dependencies
    print("\n[1/2] Installing Django dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "django", "djangorestframework", "django-cors-headers"], check=False)
    
    # Install frontend dependencies
    if os.path.exists("frontend"):
        print("[2/2] Installing frontend dependencies...")
        subprocess.run(["npm", "install"], cwd="frontend", check=False)
    
    print("\nDependencies installed!")

def setup_database():
    """Setup database"""
    print("\n" + "="*70)
    print("SETTING UP DATABASE")
    print("="*70)
    print("\nRunning migrations...")
    subprocess.run([sys.executable, "manage.py", "migrate", "--run-syncdb"], check=False)
    print("Database setup complete!")

def start_backend():
    """Start Django backend"""
    print("\n" + "="*70)
    print("STARTING DJANGO BACKEND (Port 8000)")
    print("="*70)
    print("Backend running at http://localhost:8000")
    print("API endpoint: http://localhost:8000/api/\n")
    subprocess.run([sys.executable, "manage.py", "runserver", "0.0.0.0:8000"], check=False)

def start_frontend():
    """Start Next.js frontend"""
    time.sleep(2)  # Wait for backend to start
    print("\n" + "="*70)
    print("STARTING NEXT.JS FRONTEND (Port 3000)")
    print("="*70)
    print("Frontend running at http://localhost:3000")
    print("Dashboard: http://localhost:3000/dashboard\n")
    
    if os.path.exists("frontend"):
        subprocess.run(["npm", "run", "dev"], cwd="frontend", check=False)

if __name__ == "__main__":
    try:
        # Setup
        install_dependencies()
        setup_database()
        
        # Start servers in parallel
        print("\n" + "="*70)
        print("STARTING SERVERS")
        print("="*70)
        
        backend_thread = threading.Thread(target=start_backend, daemon=False)
        frontend_thread = threading.Thread(target=start_frontend, daemon=False)
        
        backend_thread.start()
        frontend_thread.start()
        
        backend_thread.join()
        frontend_thread.join()
        
    except KeyboardInterrupt:
        print("\n\nShutting down servers...")
        sys.exit(0)
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)
