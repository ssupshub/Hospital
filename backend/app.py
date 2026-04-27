import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# ================= DATABASE CONNECTION =================
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/hospital")
client = MongoClient(MONGO_URI)
db = client.get_database() # Uses database name from URI or default

# Collections
patients_col = db.patients
doctors_col = db.doctors
appointments_col = db.appointments
bills_col = db.bills

# Helper to convert MongoDB objects to JSON serializable
def mongo_to_dict(obj):
    if obj is None: return None
    obj["id"] = str(obj["_id"])
    del obj["_id"]
    return obj

# ================= PATIENT API =================

@app.route("/addPatient", methods=["POST"])
def add_patient():
    data = request.json
    result = patients_col.insert_one(data)
    return jsonify({"message": "Patient added", "id": str(result.inserted_id)})

@app.route("/getPatients", methods=["GET"])
def get_patients():
    patients = list(patients_col.find())
    return jsonify([mongo_to_dict(p) for p in patients])

@app.route("/updatePatient/<id>", methods=["PUT"])
def update_patient(id):
    data = request.json
    patients_col.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Patient updated"})

@app.route("/deletePatient/<id>", methods=["DELETE"])
def delete_patient(id):
    patients_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

# ================= DOCTOR API =================

@app.route("/addDoctor", methods=["POST"])
def add_doctor():
    data = request.json
    result = doctors_col.insert_one(data)
    return jsonify({"message": "Doctor added", "id": str(result.inserted_id)})

@app.route("/getDoctors", methods=["GET"])
def get_doctors():
    doctors = list(doctors_col.find())
    return jsonify([mongo_to_dict(d) for d in doctors])

@app.route("/updateDoctor/<id>", methods=["PUT"])
def update_doctor(id):
    data = request.json
    doctors_col.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Doctor updated"})

@app.route("/deleteDoctor/<id>", methods=["DELETE"])
def delete_doctor(id):
    doctors_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

# ================= APPOINTMENT API =================

@app.route("/addAppointment", methods=["POST"])
def add_appointment():
    data = request.json
    result = appointments_col.insert_one(data)
    return jsonify({"message": "Appointment booked", "id": str(result.inserted_id)})

@app.route("/getAppointments", methods=["GET"])
def get_appointments():
    appointments = list(appointments_col.find())
    return jsonify([mongo_to_dict(a) for a in appointments])

@app.route("/deleteAppointment/<id>", methods=["DELETE"])
def delete_appointment(id):
    appointments_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

# ================= BILLING API =================

@app.route("/addBill", methods=["POST"])
def add_bill():
    data = request.json
    # Convert string numbers to float if they are strings
    treatment = float(data.get("treatment", 0))
    medicine = float(data.get("medicine", 0))
    doctor_fee = float(data.get("doctor_fee", 0))
    
    data["total"] = treatment + medicine + doctor_fee
    result = bills_col.insert_one(data)
    
    return jsonify({"message": "Bill generated", "id": str(result.inserted_id), "total": data["total"]})

@app.route("/getBills", methods=["GET"])
def get_bills():
    bills = list(bills_col.find())
    return jsonify([mongo_to_dict(b) for b in bills])

@app.route("/deleteBill/<id>", methods=["DELETE"])
def delete_bill(id):
    bills_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

# ================= RUN =================

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "True") == "True"
    app.run(host="0.0.0.0", port=port, debug=debug)