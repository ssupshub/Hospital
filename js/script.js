/* ==========================================================================
   CONFIG & UTILS
   ========================================================================== */
const API_URL = "http://localhost:5000"; // Should match your Flask port

function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

/* ==========================================================================
   PATIENT MANAGEMENT
   ========================================================================== */
let patientEditId = null;

async function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;
    let phone = document.getElementById("pphone") ? document.getElementById("pphone").value : "";

    if (!name || !age) {
        alert("Please fill required fields");
        return;
    }

    let patient = { name, age, disease, phone };
    let url = patientEditId ? `${API_URL}/updatePatient/${patientEditId}` : `${API_URL}/addPatient`;
    let method = patientEditId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        });
        const data = await response.json();
        alert(data.message);
        patientEditId = null;
        clearPatientForm();
        loadPatients();
    } catch (err) {
        console.error("Error saving patient:", err);
    }
}

async function loadPatients() {
    try {
        const response = await fetch(`${API_URL}/getPatients`);
        const patients = await response.json();
        let table = document.getElementById("patientTable") || document.getElementById("tableBody");
        if (!table) return;

        let output = "";
        patients.forEach((p) => {
            output += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                ${p.phone !== undefined ? `<td>${p.phone}</td>` : ""}
                <td>
                    <button class="edit" onclick="editPatient('${p.id}')">Edit</button>
                    <button class="delete" onclick="deletePatient('${p.id}')">Delete</button>
                </td>
            </tr>
            `;
        });
        table.innerHTML = output;
    } catch (err) {
        console.error("Error loading patients:", err);
    }
}

async function deletePatient(id) {
    if (confirm("Delete this patient?")) {
        try {
            await fetch(`${API_URL}/deletePatient/${id}`, { method: "DELETE" });
            loadPatients();
        } catch (err) {
            console.error("Error deleting patient:", err);
        }
    }
}

async function editPatient(id) {
    try {
        // In a real app, you might fetch specific patient. Here we find in table or fetch all.
        const response = await fetch(`${API_URL}/getPatients`);
        const patients = await response.json();
        let p = patients.find(item => item.id === id);

        document.getElementById("pname").value = p.name;
        document.getElementById("page").value = p.age;
        document.getElementById("pdisease").value = p.disease;
        if (document.getElementById("pphone")) document.getElementById("pphone").value = p.phone;

        patientEditId = id;
    } catch (err) {
        console.error("Error editing patient:", err);
    }
}

function clearPatientForm() {
    document.getElementById("pname").value = "";
    document.getElementById("page").value = "";
    document.getElementById("pdisease").value = "";
    if (document.getElementById("pphone")) document.getElementById("pphone").value = "";
}

/* ==========================================================================
   DOCTOR MANAGEMENT
   ========================================================================== */
let doctorEditId = null;

async function saveDoctor() {
    let name = document.getElementById("dname").value;
    let specialization = document.getElementById("dspecial").value;
    let experience = document.getElementById("dexp").value;

    if (!name) return;

    let doctor = { name, specialization, experience };
    let url = doctorEditId ? `${API_URL}/updateDoctor/${doctorEditId}` : `${API_URL}/addDoctor`;
    let method = doctorEditId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctor)
        });
        const data = await response.json();
        alert(data.message);
        doctorEditId = null;
        clearDoctorForm();
        displayDoctors();
    } catch (err) {
        console.error("Error saving doctor:", err);
    }
}

async function displayDoctors() {
    try {
        const response = await fetch(`${API_URL}/getDoctors`);
        const doctors = await response.json();
        let table = document.getElementById("doctorTable");
        if (!table) return;

        let output = "";
        doctors.forEach((d) => {
            output += `
            <tr>
                <td>${d.name}</td>
                <td>${d.specialization}</td>
                <td>${d.experience} yrs</td>
                <td>
                    <button class="edit" onclick="editDoctor('${d.id}')">Edit</button>
                    <button class="delete" onclick="deleteDoctor('${d.id}')">Delete</button>
                </td>
            </tr>
            `;
        });
        table.innerHTML = output;
    } catch (err) {
        console.error("Error loading doctors:", err);
    }
}

async function deleteDoctor(id) {
    try {
        await fetch(`${API_URL}/deleteDoctor/${id}`, { method: "DELETE" });
        displayDoctors();
    } catch (err) {
        console.error("Error deleting doctor:", err);
    }
}

async function editDoctor(id) {
    try {
        const response = await fetch(`${API_URL}/getDoctors`);
        const doctors = await response.json();
        let d = doctors.find(item => item.id === id);

        document.getElementById("dname").value = d.name;
        document.getElementById("dspecial").value = d.specialization;
        document.getElementById("dexp").value = d.experience;

        doctorEditId = id;
    } catch (err) {
        console.error("Error editing doctor:", err);
    }
}

function clearDoctorForm() {
    document.getElementById("dname").value = "";
    document.getElementById("dspecial").value = "";
    document.getElementById("dexp").value = "";
}

/* ==========================================================================
   APPOINTMENT MANAGEMENT
   ========================================================================== */
async function saveAppointment() {
    let patient = document.getElementById("apatient").value;
    let doctor = document.getElementById("adoctor").value;
    let date = document.getElementById("adate").value;
    let time = document.getElementById("atime").value;

    let appointment = { patient, doctor, date, time };

    try {
        const response = await fetch(`${API_URL}/addAppointment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment)
        });
        const data = await response.json();
        alert(data.message);
        clearAppointmentForm();
        displayAppointments();
    } catch (err) {
        console.error("Error booking appointment:", err);
    }
}

async function displayAppointments() {
    try {
        const response = await fetch(`${API_URL}/getAppointments`);
        const appointments = await response.json();
        let table = document.getElementById("appointmentTable");
        if (!table) return;

        let output = "";
        appointments.forEach((a) => {
            output += `
            <tr>
                <td>${a.patient}</td>
                <td>${a.doctor}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
                <td>
                    <button class="delete" onclick="deleteAppointment('${a.id}')">Delete</button>
                </td>
            </tr>
            `;
        });
        table.innerHTML = output;
    } catch (err) {
        console.error("Error loading appointments:", err);
    }
}

async function deleteAppointment(id) {
    try {
        await fetch(`${API_URL}/deleteAppointment/${id}`, { method: "DELETE" });
        displayAppointments();
    } catch (err) {
        console.error("Error deleting appointment:", err);
    }
}

function clearAppointmentForm() {
    document.getElementById("apatient").value = "";
    document.getElementById("adoctor").value = "";
    document.getElementById("adate").value = "";
    document.getElementById("atime").value = "";
}

/* ==========================================================================
   BILLING MANAGEMENT
   ========================================================================== */
async function generateBill() {
    let patient = document.getElementById("patientName") ? document.getElementById("patientName").value : "Walk-in";
    let treatment = document.getElementById("treatment") ? document.getElementById("treatment").value : 0;
    let medicine = document.getElementById("medicine") ? document.getElementById("medicine").value : 0;
    let doctor_fee = document.getElementById("doctorFee") ? document.getElementById("doctorFee").value : 0;

    let bill = { patient, treatment, medicine, doctor_fee };

    try {
        const response = await fetch(`${API_URL}/addBill`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bill)
        });
        const data = await response.json();
        alert(`Bill Generated! Total: ₹${data.total}`);
    } catch (err) {
        console.error("Error generating bill:", err);
    }
}

/* ==========================================================================
   LOGIN LOGIC
   ========================================================================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        // Simple login (could be moved to backend)
        if (user === "admin" && pass === "admin123") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid Credentials!");
        }
    });
}