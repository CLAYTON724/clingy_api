#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Starting Next.js development server..."
npm run dev
