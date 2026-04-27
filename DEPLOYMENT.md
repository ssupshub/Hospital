# Deployment Guide - Hospital Management System

This guide covers deploying the complete Hospital Management System including the Flask backend, MongoDB database, and the static frontend.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup (MongoDB)](#database-setup-mongodb)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Production Deployment](#production-deployment)
7. [Environment Variables Reference](#environment-variables-reference)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- Python 3.8 or higher
- MongoDB Community Server 6.0+ (or MongoDB Atlas account)
- Git
- A modern web browser

### Required Python Packages
```
flask
flask-cors
pymongo
python-dotenv
gunicorn (for production)
```

---

## Local Development Setup

### Step 1: Clone and Navigate
```bash
git clone <your-repository-url>
cd Hospital
```

### Step 2: Install Python Dependencies
```bash
pip install flask flask-cors pymongo python-dotenv
```

### Step 3: Configure Environment
```bash
copy .env.example .env
```
Edit `.env` with your settings:
```
MONGO_URI=mongodb://localhost:27017/hospital
PORT=5000
DEBUG=True
```

### Step 4: Start MongoDB
Ensure MongoDB is running on your system:
```bash
# Windows (if installed as a service, it runs automatically)
# Otherwise, start manually:
mongod --dbpath "C:\data\db"
```

### Step 5: Seed the Database
```bash
python backend/seed.py
```
Expected output:
```
Database seeded successfully!
  Patients:     15
  Doctors:      10
  Appointments: 10
  Bills:        8
Indexes created on key fields for performance.
```

### Step 6: Start the Backend Server
```bash
python backend/app.py
```
The API will be available at `http://localhost:5000`.

### Step 7: Open the Frontend
Open `index.html` in your browser. All pages will communicate with the backend at `http://localhost:5000`.

### Step 8: Verify
Visit `http://localhost:5000/` in your browser. You should see:
```json
{"status": "ok", "database": "connected"}
```

---

## Database Setup (MongoDB)

### Option A: Local MongoDB

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings.
3. MongoDB runs on `mongodb://localhost:27017` by default.
4. No manual database or collection creation is needed. They are created automatically when data is inserted.

### Option B: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free M0 tier is sufficient).
3. Under "Database Access", create a user with read/write permissions.
4. Under "Network Access", add your IP address (or `0.0.0.0/0` for development).
5. Click "Connect" and copy the connection string.
6. Update your `.env` file:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hospital?retryWrites=true&w=majority
```

### Database Collections
The application uses 4 collections:
| Collection     | Purpose                     |
|----------------|-----------------------------|
| `patients`     | Patient records             |
| `doctors`      | Doctor profiles             |
| `appointments` | Scheduled appointments      |
| `bills`        | Generated billing records   |

### Indexes
The seed script creates the following indexes for query performance:
- `patients.name`, `patients.phone` (unique)
- `doctors.name`, `doctors.specialization`
- `appointments.date`, compound `(patient, doctor)`
- `bills.patient`

---

## Backend Deployment

### Development Server
```bash
python backend/app.py
```
This runs Flask's built-in development server. Suitable for testing only.

### Production Server (Gunicorn)
For production, use Gunicorn (Linux/Mac) or Waitress (Windows):

**Linux/Mac:**
```bash
pip install gunicorn
cd backend
gunicorn app:app --bind 0.0.0.0:5000 --workers 4
```

**Windows:**
```bash
pip install waitress
cd backend
waitress-serve --host=0.0.0.0 --port=5000 app:app
```

### Deploy to Render (Free Hosting)

1. Push your code to a GitHub repository.
2. Create a free account at https://render.com
3. Create a new "Web Service" and connect your GitHub repo.
4. Configure:
   - Root Directory: `backend`
   - Build Command: `pip install flask flask-cors pymongo python-dotenv gunicorn`
   - Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`
5. Add Environment Variables in the Render dashboard:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `PORT` = 5000
   - `DEBUG` = False
6. Deploy.

### Deploy to Railway

1. Push code to GitHub.
2. Create account at https://railway.app
3. Create a new project from GitHub repo.
4. Set root directory to `backend`.
5. Add environment variables.
6. Railway auto-detects Python and deploys.

---

## Frontend Deployment

The frontend is entirely static (HTML, CSS, JS). No build step required.

### Important: Update API URL
Before deploying the frontend, update the `API_URL` in `js/script.js` to point to your deployed backend:
```javascript
const API_URL = "https://your-backend-url.onrender.com";
```

### Deploy to GitHub Pages

1. Push your code to GitHub.
2. Go to repository Settings > Pages.
3. Set source to "main" branch and root folder.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Deploy to Netlify

1. Go to https://netlify.com and sign in.
2. Drag and drop your project folder (excluding `backend/` and `.env`).
3. Site deploys instantly.

### Deploy to Vercel

1. Push code to GitHub.
2. Import project at https://vercel.com
3. Set Framework Preset to "Other".
4. Deploy.

---

## Production Deployment

### Full Stack Architecture
```
[Browser] --> [Frontend: Netlify/Vercel/GitHub Pages]
                  |
                  v (API calls)
          [Backend: Render/Railway]
                  |
                  v
          [Database: MongoDB Atlas]
```

### Recommended Free Stack
| Component  | Service         | Free Tier                    |
|------------|-----------------|------------------------------|
| Frontend   | GitHub Pages    | Unlimited static hosting     |
| Backend    | Render          | 750 hours/month              |
| Database   | MongoDB Atlas   | 512 MB storage (M0 cluster)  |

### Production Checklist
- [ ] Set `DEBUG=False` in production `.env`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Update `API_URL` in `js/script.js` to deployed backend URL
- [ ] Use HTTPS for all connections
- [ ] Set strong CORS origins in `app.py` (replace `CORS(app)` with specific origins)
- [ ] Change default login credentials
- [ ] Enable MongoDB authentication

---

## Environment Variables Reference

| Variable    | Description                    | Default                                |
|-------------|--------------------------------|----------------------------------------|
| `MONGO_URI` | MongoDB connection string      | `mongodb://localhost:27017/hospital`   |
| `PORT`      | Backend server port            | `5000`                                 |
| `DEBUG`     | Enable Flask debug mode        | `True`                                 |

---

## Troubleshooting

### "Connection refused" when loading data
- Ensure MongoDB is running: `mongod` or check Windows Services.
- Ensure the Flask backend is running: `python backend/app.py`.
- Check that `API_URL` in `js/script.js` matches the backend port.

### "CORS error" in browser console
- Ensure `flask-cors` is installed and `CORS(app)` is in `app.py`.

### Seed script fails
- Verify MongoDB is running and `MONGO_URI` in `.env` is correct.
- Test connection: `python -c "from pymongo import MongoClient; MongoClient('mongodb://localhost:27017').admin.command('ping')"`

### Empty tables on frontend
- Open browser DevTools (F12) > Console tab to check for errors.
- Visit `http://localhost:5000/getPatients` directly to verify API returns data.
- Run `python backend/seed.py` if database is empty.

### MongoDB Atlas connection issues
- Whitelist your IP in Atlas Network Access settings.
- Ensure username/password in connection string are URL-encoded.
- Check that the database name is included in the URI.
