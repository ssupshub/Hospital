import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Search for .env in root when running from api/ or locally
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/hospital")
client = MongoClient(MONGO_URI)
db = client.get_database()

def seed_db(db):
    # Clear existing data
    db.patients.drop()
    db.doctors.drop()
    db.appointments.drop()
    db.bills.drop()

    # ==================== PATIENTS ====================
    patients = [
        {"name": "Rahul Sharma", "age": "34", "disease": "Diabetes", "phone": "9876543210"},
        {"name": "Priya Patel", "age": "28", "disease": "Migraine", "phone": "9876543211"},
        {"name": "Amit Kumar", "age": "45", "disease": "Hypertension", "phone": "9876543212"},
        {"name": "Sneha Reddy", "age": "52", "disease": "Arthritis", "phone": "9876543213"},
        {"name": "Vikram Singh", "age": "61", "disease": "Heart Disease", "phone": "9876543214"},
        {"name": "Anjali Gupta", "age": "38", "disease": "Thyroid", "phone": "9876543215"},
        {"name": "Rajesh Nair", "age": "42", "disease": "Asthma", "phone": "9876543216"},
        {"name": "Meera Joshi", "age": "29", "disease": "Anemia", "phone": "9876543217"},
        {"name": "Suresh Verma", "age": "55", "disease": "Back Pain", "phone": "9876543218"},
        {"name": "Kavita Desai", "age": "33", "disease": "Allergy", "phone": "9876543219"},
        {"name": "Deepak Mishra", "age": "47", "disease": "Kidney Stone", "phone": "9876543220"},
        {"name": "Pooja Iyer", "age": "26", "disease": "Fever", "phone": "9876543221"},
        {"name": "Manish Tiwari", "age": "58", "disease": "Cataract", "phone": "9876543222"},
        {"name": "Sunita Rao", "age": "41", "disease": "Bronchitis", "phone": "9876543223"},
        {"name": "Arjun Kapoor", "age": "36", "disease": "Gastritis", "phone": "9876543224"},
    ]

    # ==================== DOCTORS ====================
    doctors = [
        {"name": "Dr. Anil Mehta", "specialization": "Cardiology", "experience": "18"},
        {"name": "Dr. Suman Das", "specialization": "Neurology", "experience": "12"},
        {"name": "Dr. Rekha Pillai", "specialization": "Orthopedics", "experience": "15"},
        {"name": "Dr. Vivek Saxena", "specialization": "Dermatology", "experience": "10"},
        {"name": "Dr. Nisha Agarwal", "specialization": "Pediatrics", "experience": "8"},
        {"name": "Dr. Kiran Bhat", "specialization": "General Medicine", "experience": "20"},
        {"name": "Dr. Ravi Kulkarni", "specialization": "ENT", "experience": "14"},
        {"name": "Dr. Anita Jain", "specialization": "Ophthalmology", "experience": "11"},
        {"name": "Dr. Sanjay Dubey", "specialization": "Urology", "experience": "16"},
        {"name": "Dr. Prerna Malhotra", "specialization": "Gynecology", "experience": "9"},
    ]

    # ==================== APPOINTMENTS ====================
    appointments = [
        {"patient": "Rahul Sharma", "doctor": "Dr. Kiran Bhat", "date": "2026-04-28", "time": "09:00"},
        {"patient": "Priya Patel", "doctor": "Dr. Suman Das", "date": "2026-04-28", "time": "09:30"},
        {"patient": "Amit Kumar", "doctor": "Dr. Anil Mehta", "date": "2026-04-28", "time": "10:00"},
        {"patient": "Sneha Reddy", "doctor": "Dr. Rekha Pillai", "date": "2026-04-28", "time": "10:30"},
        {"patient": "Vikram Singh", "doctor": "Dr. Anil Mehta", "date": "2026-04-28", "time": "11:00"},
        {"patient": "Anjali Gupta", "doctor": "Dr. Kiran Bhat", "date": "2026-04-29", "time": "09:00"},
        {"patient": "Rajesh Nair", "doctor": "Dr. Kiran Bhat", "date": "2026-04-29", "time": "09:30"},
        {"patient": "Meera Joshi", "doctor": "Dr. Prerna Malhotra", "date": "2026-04-29", "time": "10:00"},
        {"patient": "Deepak Mishra", "doctor": "Dr. Sanjay Dubey", "date": "2026-04-29", "time": "10:30"},
        {"patient": "Manish Tiwari", "doctor": "Dr. Anita Jain", "date": "2026-04-30", "time": "09:00"},
    ]

    # ==================== BILLS ====================
    bills = [
        {"patient": "Rahul Sharma", "treatment": 2000, "medicine": 800, "doctor_fee": 500, "total": 3300},
        {"patient": "Priya Patel", "treatment": 1500, "medicine": 600, "doctor_fee": 500, "total": 2600},
        {"patient": "Amit Kumar", "treatment": 5000, "medicine": 1200, "doctor_fee": 1000, "total": 7200},
        {"patient": "Sneha Reddy", "treatment": 3000, "medicine": 900, "doctor_fee": 700, "total": 4600},
        {"patient": "Vikram Singh", "treatment": 8000, "medicine": 2500, "doctor_fee": 1500, "total": 12000},
        {"patient": "Anjali Gupta", "treatment": 1800, "medicine": 500, "doctor_fee": 500, "total": 2800},
        {"patient": "Rajesh Nair", "treatment": 2200, "medicine": 700, "doctor_fee": 500, "total": 3400},
        {"patient": "Meera Joshi", "treatment": 1200, "medicine": 400, "doctor_fee": 500, "total": 2100},
    ]

    # ==================== INSERT ====================
    db.patients.insert_many(patients)
    db.doctors.insert_many(doctors)
    db.appointments.insert_many(appointments)
    db.bills.insert_many(bills)

    # ==================== CREATE INDEXES ====================
    db.patients.create_index("name")
    db.patients.create_index("phone", unique=True)
    db.doctors.create_index("name")
    db.doctors.create_index("specialization")
    db.appointments.create_index("date")
    db.appointments.create_index([("patient", 1), ("doctor", 1)])
    db.bills.create_index("patient")

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db(db)
