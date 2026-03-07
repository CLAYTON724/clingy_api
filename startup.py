#!/usr/bin/env python3
import subprocess
import sys
import os
import time
import signal

# Get the project directory
PROJECT_DIR = "/vercel/share/v0-project"
FRONTEND_DIR = os.path.join(PROJECT_DIR, "frontend")

print("=" * 70)
print("CLINGY API - HR PORTAL STARTUP")
print("=" * 70)

# Change to project directory
os.chdir(PROJECT_DIR)
print(f"\nWorking directory: {os.getcwd()}")

# Install Django dependencies
print("\n[1/5] Installing Django dependencies...")
try:
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "django", "djangorestframework", "django-cors-headers"], check=True)
    print("✓ Django dependencies installed")
except Exception as e:
    print(f"✗ Error installing Django dependencies: {e}")

# Run migrations
print("\n[2/5] Running database migrations...")
try:
    subprocess.run([sys.executable, "manage.py", "migrate", "--run-syncdb"], cwd=PROJECT_DIR, check=True)
    print("✓ Migrations complete")
except Exception as e:
    print(f"✗ Error running migrations: {e}")

# Install frontend dependencies
print("\n[3/5] Installing frontend dependencies...")
try:
    subprocess.run(["npm", "install"], cwd=FRONTEND_DIR, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("✓ Frontend dependencies installed")
except Exception as e:
    print(f"✗ Error installing frontend dependencies: {e}")

# Start backend
print("\n[4/5] Starting Django backend (port 8000)...")
backend_process = subprocess.Popen(
    [sys.executable, "manage.py", "runserver", "0.0.0.0:8000"],
    cwd=PROJECT_DIR,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)
time.sleep(2)
print("✓ Django backend starting on http://localhost:8000")

# Start frontend
print("\n[5/5] Starting Next.js frontend (port 3000)...")
frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=FRONTEND_DIR,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)
time.sleep(3)
print("✓ Next.js frontend starting on http://localhost:3000")

print("\n" + "=" * 70)
print("HR PORTAL IS RUNNING!")
print("=" * 70)
print("\nFrontend:  http://localhost:3000")
print("Backend:   http://localhost:8000/api/")
print("\nPress Ctrl+C to stop all services")
print("=" * 70 + "\n")

# Keep processes running
try:
    while True:
        time.sleep(1)
        if backend_process.poll() is not None:
            print("Backend process ended unexpectedly")
            break
        if frontend_process.poll() is not None:
            print("Frontend process ended unexpectedly")
            break
except KeyboardInterrupt:
    print("\n\nShutting down services...")
    backend_process.terminate()
    frontend_process.terminate()
    backend_process.wait()
    frontend_process.wait()
    print("Services stopped")
