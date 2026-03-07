#!/bin/bash

echo "Starting Clingy API HR Portal..."
echo ""

# Start Django backend in background
echo "Starting Django backend on http://localhost:8000..."
python manage.py runserver &
DJANGO_PID=$!

# Wait a moment for Django to start
sleep 3

# Start Next.js frontend in background
echo "Starting Next.js frontend on http://localhost:3000..."
cd frontend
npm install
npm run dev &
NEXT_PID=$!

# Wait for both to be ready
sleep 5

echo ""
echo "==========================================
echo "✓ Django Backend: http://localhost:8000"
echo "✓ Next.js Frontend: http://localhost:3000"
echo "✓ API: http://localhost:8000/api"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $DJANGO_PID $NEXT_PID
