# HR Portal Frontend

A modern, responsive Next.js frontend for the CLINGY API HR Management system.

## Features

- Dashboard with organization overview
- Employee management
- Project tracking
- Department management
- Real-time data fetching with SWR
- Responsive sidebar navigation

## Getting Started

### Prerequisites

- Node.js 18+ (or use the included `nvm`)
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file with your API configuration:
```bash
cp .env.example .env.local
```

4. Update the API URL if needed (default is `http://localhost:8000/api`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to the dashboard.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── dashboard/        # Dashboard page
│   ├── employees/        # Employees management
│   ├── projects/         # Projects management
│   ├── departments/      # Departments management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (redirects to dashboard)
├── components/
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── StatCard.tsx      # Statistics card component
├── lib/
│   └── api.ts            # API utilities and fetch functions
└── public/               # Static files
```

## API Integration

The frontend fetches data from the Django REST API endpoints:
- `GET /api/employees/` - List all employees
- `GET /api/projects/` - List all projects
- `GET /api/departments/` - List all departments

Data fetching is handled using [SWR](https://swr.vercel.app/) for efficient caching and synchronization.

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SWR** - Data fetching
- **Axios** - HTTP client
