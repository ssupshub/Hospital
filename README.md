# Hospital Management System

## Overview
The Hospital Management System is a comprehensive web-based application designed to streamline healthcare facility operations. It provides a centralized platform for managing patient records, doctor schedules, appointments, and billing processes. The system features a clean, responsive interface and a robust backend integrated with MongoDB.

## Features
- Dashboard: Real-time statistical overview of patients, doctors, appointments, and total revenue.
- Patient Management: Full CRUD operations for patient records, including contact information and medical history.
- Doctor Management: Management of medical staff profiles, specializations, and years of experience.
- Appointment System: Simplified booking and tracking of medical appointments.
- Billing System: Automated calculation and generation of patient bills based on treatments and medications.
- Secure Authentication: Administrative login system for protected access to management modules.

## Technology Stack
- Frontend: HTML5, CSS3 (Consolidated Style System), JavaScript (ES6+ Fetch API).
- Backend: Python (Flask Framework).
- Database: MongoDB.
- Configuration: Dotenv for environment variable management.

## Project Structure
```
Hospital/
├── backend/
│   ├── app.py          (Flask API Server)
│   └── hospital.db     (Legacy SQLite - Optional)
├── css/
│   └── style.css       (Consolidated Global Styles)
├── images/
│   └── hospital-images.jpg
├── js/
│   └── script.js       (Consolidated Frontend Logic)
├── index.html          (Main Landing Page)
├── dashboard.html      (Administrative Dashboard)
├── login.html          (Authentication Page)
├── .env                (Environment Configuration)
└── README.md           (System Documentation)
```

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- MongoDB Community Server
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

### Frontend Deployment
The frontend is built using standard web technologies and does not require a build step.
1. Open `index.html` in a modern web browser.
2. Ensure the backend server is running to enable database interactions.

## Usage
- Access the system through the landing page.
- Navigate to the Login module to gain administrative access (Default credentials: admin / admin123).
- Use the Dashboard to navigate between different management modules.

## License
This project is for educational and internal management purposes.
