# HabitFlow - Habit Tracking Application

A minimal, beautiful habit-tracking app that helps users build small daily habits through micro-goals, streaks, and motivational nudges.

## Deployment Instructions

### Frontend Deployment (Vercel)

1. Sign up for a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy the frontend:
```bash
vercel
```

5. Set environment variables in Vercel:
- VITE_API_URL: Your backend API URL (after deploying to Railway)

### Backend Deployment (Railway)

1. Sign up for a [Railway account](https://railway.app/)
2. Install Railway CLI:
```bash
npm i -g @railway/cli
```

3. Login to Railway:
```bash
railway login
```

4. Initialize Railway project:
```bash
cd server
railway init
```

5. Deploy the backend:
```bash
railway up
```

6. Set environment variables in Railway:
- PORT: 5000
- MONGODB_URI: Your MongoDB connection string
- JWT_SECRET: Your JWT secret key

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Create `.env` file in the server directory with required environment variables

4. Start development servers:
```bash
# Start frontend
npm run dev

# Start backend
cd server
npm run dev
```

## Features

- 🎯 Create and track daily habits
- 📊 Visual progress tracking
- 🏆 Achievement badges
- 📱 Mobile-friendly design
- 🔔 Customizable reminders
- 📈 Weekly and monthly progress charts

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Charts: Recharts
- Routing: React Router
- State Management: React Hooks + LocalStorage
# habittracker
