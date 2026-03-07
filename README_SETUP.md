# Clingy API HR Portal - Full Stack Setup

This project consists of a Django REST API backend and a Next.js frontend for managing employees, projects, and departments.

## Project Structure

```
clingy_api/
├── core/                 # Django app with models and API views
├── clingy_api/          # Django project settings
├── frontend/            # Next.js frontend application
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
└── README_SETUP.md      # This file
```

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn

## Quick Start

### Option 1: Run Both Servers Simultaneously

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Run migrations (first time only):**
   ```bash
   python manage.py migrate
   ```

4. **Start both servers:**
   
   **On Linux/Mac:**
   ```bash
   # Terminal 1: Start Django backend
   python manage.py runserver 0.0.0.0:8000
   
   # Terminal 2: Start Next.js frontend
   cd frontend
   npm run dev
   ```
   
   **On Windows (PowerShell):**
   ```bash
   # Terminal 1: Start Django backend
   python manage.py runserver 0.0.0.0:8000
   
   # Terminal 2: Start Next.js frontend
   cd frontend
   npm run dev
   ```

### Option 2: Run One Server at a Time

1. **Start Backend Only:**
   ```bash
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```
   Access API at: http://localhost:8000/api

2. **Start Frontend Only (in a separate process):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Access UI at: http://localhost:3000

## Available Endpoints

### Django REST API (Backend)
- **Employees**: `http://localhost:8000/api/employees/`
- **Projects**: `http://localhost:8000/api/projects/`
- **Departments**: `http://localhost:8000/api/departments/`

### Next.js Frontend (Frontend)
- **Dashboard**: `http://localhost:3000/dashboard`
- **Employees**: `http://localhost:3000/employees`
- **Projects**: `http://localhost:3000/projects`
- **Departments**: `http://localhost:3000/departments`

## Environment Configuration

The frontend looks for the backend API at:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

This is configured in `frontend/.env.local`. If you change the backend port, update this file accordingly.

## Testing the Connection

After both servers are running:

1. Open http://localhost:3000 in your browser
2. You should see the HR Portal Dashboard
3. If data appears, the frontend and backend are properly connected

## Troubleshooting

### Django Migrations Error
If you see migration errors, run:
```bash
python manage.py makemigrations
python manage.py migrate
```

### CORS Errors
Make sure the Django CORS settings in `clingy_api/settings.py` include:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Port Already in Use
- Django (port 8000): `python manage.py runserver 8001`
- Next.js (port 3000): `cd frontend && PORT=3001 npm run dev`

### Dependencies Issues
```bash
# Clear cache and reinstall
pip install --upgrade pip
pip install -r requirements.txt

cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Development

### Backend Development
- API endpoints: `core/views.py`
- Models: `core/models.py`
- Serializers: `core/serializers.py`
- URLs: `core/urls.py` and `clingy_api/urls.py`

### Frontend Development
- Main dashboard: `frontend/app/dashboard/page.tsx`
- Components: `frontend/components/`
- Styling: `frontend/app/globals.css` (Tailwind CSS)
- API client: `frontend/lib/api.ts`

## Build for Production

### Backend
```bash
python manage.py collectstatic
# Deploy using gunicorn, uWSGI, or similar
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## License

Proprietary - Clingy API
