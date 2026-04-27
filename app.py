from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# ================= DATABASE =================
def get_db():
    conn = sqlite3.connect("hospital.db")
    conn.row_factory = sqlite3.Row
    return conn

# ================= CREATE TABLES =================
def create_tables():
    conn = get_db()

    # PATIENT
    conn.execute("""
        conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
""")
        )
    """)

    # DOCTOR
    conn.execute("""
        CREATE TABLE IF NOT EXISTS doctors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            specialization TEXT,
            experience INTEGER
        )
    """)

    # APPOINTMENT
    conn.execute("""
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient TEXT,
            doctor TEXT,
            date TEXT,
            time TEXT
        )
    """)

    # BILLING
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient TEXT,
            treatment REAL,
            medicine REAL,
            doctor_fee REAL,
            total REAL
        )
    """)

    conn.commit()
    conn.close()

create_tables()

# ================= PATIENT API =================

@app.route("/addPatient", methods=["POST"])
def add_patient():
    data = request.json
    conn = get_db()
    conn.execute("INSERT INTO patients (name, age, disease, phone) VALUES (?, ?, ?, ?)",
                 (data["name"], data["age"], data["disease"], data["phone"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Patient added"})

@app.route("/getPatients", methods=["GET"])
def get_patients():
    conn = get_db()
    data = conn.execute("SELECT * FROM patients").fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@app.route("/deletePatient/<int:id>", methods=["DELETE"])
def delete_patient(id):
    conn = get_db()
    conn.execute("DELETE FROM patients WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"})

# ================= DOCTOR API =================

@app.route("/addDoctor", methods=["POST"])
def add_doctor():
    data = request.json
    conn = get_db()
    conn.execute("INSERT INTO doctors (name, specialization, experience) VALUES (?, ?, ?)",
                 (data["name"], data["specialization"], data["experience"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Doctor added"})

@app.route("/getDoctors", methods=["GET"])
def get_doctors():
    conn = get_db()
    data = conn.execute("SELECT * FROM doctors").fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@app.route("/deleteDoctor/<int:id>", methods=["DELETE"])
def delete_doctor(id):
    conn = get_db()
    conn.execute("DELETE FROM doctors WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"})

# ================= APPOINTMENT API =================

@app.route("/addAppointment", methods=["POST"])
def add_appointment():
    data = request.json
    conn = get_db()
    conn.execute("INSERT INTO appointments (patient, doctor, date, time) VALUES (?, ?, ?, ?)",
                 (data["patient"], data["doctor"], data["date"], data["time"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment booked"})

@app.route("/getAppointments", methods=["GET"])
def get_appointments():
    conn = get_db()
    data = conn.execute("SELECT * FROM appointments").fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@app.route("/deleteAppointment/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    conn = get_db()
    conn.execute("DELETE FROM appointments WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"})

# ================= BILLING API =================

@app.route("/addBill", methods=["POST"])
def add_bill():
    data = request.json

    total = data["treatment"] + data["medicine"] + data["doctor_fee"]

    conn = get_db()
    conn.execute("""
        INSERT INTO bills (patient, treatment, medicine, doctor_fee, total)
        VALUES (?, ?, ?, ?, ?)
    """, (data["patient"], data["treatment"], data["medicine"], data["doctor_fee"], total))

    conn.commit()
    conn.close()

    return jsonify({"message": "Bill generated", "total": total})

@app.route("/getBills", methods=["GET"])
def get_bills():
    conn = get_db()
    data = conn.execute("SELECT * FROM bills").fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@app.route("/deleteBill/<int:id>", methods=["DELETE"])
def delete_bill(id):
    conn = get_db()
    conn.execute("DELETE FROM bills WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"})

# ================= RUN =================

if __name__ == "__main__":
    app.run(debug=True)