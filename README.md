# Hospital Management System

## Overview
The Hospital Management System is a comprehensive web-based application designed to streamline healthcare facility operations. It provides a centralized platform for managing patient records, doctor schedules, appointments, and billing processes. The system features a clean, modern interface and a robust backend integrated with MongoDB.

## Features
- Dashboard: Real-time statistical overview of patients, doctors, appointments, and total revenue.
- Patient Management: Full CRUD operations for patient records, including contact information and medical history.
- Doctor Management: Management of medical staff profiles, specializations, and years of experience.
- Appointment System: Simplified booking and tracking of medical appointments.
- Billing System: Automated calculation and generation of patient bills based on treatments and medications.
- Secure Authentication: Administrative login system for protected access to management modules.

## Technology Stack
- Frontend: HTML5, CSS3 (Custom Design System with CSS Variables), JavaScript (ES6+ Async/Await Fetch API).
- Backend: Python (Flask Framework).
- Database: MongoDB (via PyMongo).
- Configuration: Dotenv for environment variable management.
- Typography: Inter (Google Fonts).

## Project Structure
```
Hospital/
├── api/
│   ├── index.py             (Vercel Function Entry Point)
│   ├── requirements.txt     (Python Dependencies)
│   └── seed.py              (Database Seeding Script)
├── backend/
│   ├── app.py              (Flask API Server with MongoDB)
│   ├── requirements.txt     (Legacy Requirements)
│   └── seed.py              (Legacy Seed Script)
├── css/
│   └── style.css            (Design System with CSS Variables)
├── js/
│   └── script.js            (Frontend Logic with Fetch API)
├── index.html               (Landing Page)
├── dashboard.html           (Administrative Dashboard)
├── login.html               (Authentication Page)
├── patient.html             (Patient Management)
├── doctor.html              (Doctor Management)
├── appointment.html         (Appointment Booking)
├── billing.html             (Billing System)
├── .env                     (Environment Configuration)
├── vercel.json              (Vercel Configuration)
└── README.md                (Documentation)
```

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- MongoDB Community Server (running on localhost:27017)
- Pip (Python Package Manager)

### Backend Configuration
1. Install the required Python packages:
   ```bash
   pip install flask flask-cors pymongo python-dotenv
   ```
2. Configure the environment variables:
   - Copy `.env.example` to `.env`.
   - Update the `MONGO_URI` to match your local or cloud MongoDB instance.
3. Start the Flask server:
   ```bash
   python backend/app.py
   ```

### Vercel Deployment (Recommended for Cloud)
1. Install [Vercel CLI](https://vercel.com/download).
2. Connect to your GitHub repository and import the project.
3. Add `MONGO_URI` to your project environment variables in the Vercel Dashboard.
4. Deploy with `vercel --prod`.

### Frontend
The frontend is built using standard web technologies and does not require a build step.
1. Open `index.html` in a modern web browser.
2. Ensure the backend server is running on port 5000 to enable database interactions.

## Default Credentials
- Username: admin
- Password: admin123

## Design System
The UI is built with a custom CSS design system featuring:
- CSS custom properties for consistent theming
- Inter font family for modern typography
- Responsive grid layouts with mobile breakpoints
- Subtle animations and transitions
- Clean card-based component architecture

## License
This project is for educational and internal management purposes.
