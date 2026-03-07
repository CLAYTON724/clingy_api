#!/usr/bin/env python
"""
Setup and run both Django backend and Next.js frontend
"""
import os
import sys
import subprocess
import time
import platform

def run_command(cmd, cwd=None, name=""):
    """Run a command and return the process"""
    print(f"\n{'='*60}")
    print(f"Starting: {name}")
    print(f"Command: {' '.join(cmd)}")
    print(f"{'='*60}\n")
    
    try:
        process = subprocess.Popen(cmd, cwd=cwd)
        return process
    except Exception as e:
        print(f"Error starting {name}: {e}")
        return None

def setup_backend():
    """Setup Django backend"""
    print("\n" + "="*60)
    print("SETTING UP DJANGO BACKEND")
    print("="*60)
    
    backend_dir = "/vercel/share/v0-project"
    
    # Install dependencies
    print("\n1. Installing Python dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "django", "djangorestframework", "django-cors-headers"], check=False)
    
    # Run migrations
    print("2. Running database migrations...")
    subprocess.run([sys.executable, "manage.py", "migrate", "--run-syncdb"], cwd=backend_dir, check=False)
    
    print("3. Backend setup complete!")

def setup_frontend():
    """Setup Next.js frontend"""
    print("\n" + "="*60)
    print("SETTING UP NEXT.JS FRONTEND")
    print("="*60)
    
    frontend_dir = "/vercel/share/v0-project/frontend"
    
    if not os.path.exists(frontend_dir):
        print(f"Frontend directory not found at {frontend_dir}")
        return False
    
    # Install dependencies
    print("\n1. Installing frontend dependencies...")
    cmd = "npm install" if os.path.exists(os.path.join(frontend_dir, "package.json")) else None
    
    if cmd:
        if platform.system() == "Windows":
            subprocess.run(cmd, shell=True, cwd=frontend_dir, check=False)
        else:
            subprocess.run(cmd.split(), cwd=frontend_dir, check=False)
    
    print("2. Frontend setup complete!")
    return True

def main():
    """Main function"""
    print("\n" + "="*70)
    print("CLINGY API - HR PORTAL - DEVELOPMENT SERVER")
    print("="*70)
    
    # Setup backend
    setup_backend()
    
    # Setup frontend
    setup_frontend()
    
    print("\n" + "="*70)
    print("STARTING SERVICES")
    print("="*70)
    
    # Start backend
    backend_dir = "/vercel/share/v0-project"
    backend_process = run_command(
        [sys.executable, "manage.py", "runserver", "0.0.0.0:8000"],
        cwd=backend_dir,
        name="Django Backend (Port 8000)"
    )
    
    # Wait a bit for backend to start
    time.sleep(3)
    
    # Start frontend
    frontend_dir = "/vercel/share/v0-project/frontend"
    if os.path.exists(frontend_dir):
        if platform.system() == "Windows":
            frontend_process = run_command(
                ["cmd", "/c", "npm", "run", "dev"],
                cwd=frontend_dir,
                name="Next.js Frontend (Port 3000)"
            )
        else:
            frontend_process = run_command(
                ["npm", "run", "dev"],
                cwd=frontend_dir,
                name="Next.js Frontend (Port 3000)"
            )
    else:
        frontend_process = None
    
    print("\n" + "="*70)
    print("SERVICES STARTED!")
    print("="*70)
    print("\nBackend API: http://localhost:8000")
    print("Frontend: http://localhost:3000")
    print("\nPress Ctrl+C to stop all services...")
    print("="*70 + "\n")
    
    try:
        # Keep processes running
        if backend_process:
            backend_process.wait()
        if frontend_process:
            frontend_process.wait()
    except KeyboardInterrupt:
        print("\n\nShutting down services...")
        if backend_process and backend_process.poll() is None:
            backend_process.terminate()
        if frontend_process and frontend_process.poll() is None:
            frontend_process.terminate()
        time.sleep(1)
        print("Services stopped.")

if __name__ == "__main__":
    main()
