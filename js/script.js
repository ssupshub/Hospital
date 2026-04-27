/* ==========================================================================
   GLOBAL & NAVIGATION
   ========================================================================== */
function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Check login status on protected pages
if (!window.location.href.includes("login.html") && !window.location.href.includes("index.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        // window.location.href = "login.html"; // Uncomment to enable protection
    }
}

/* ==========================================================================
   PATIENT MANAGEMENT
   ========================================================================== */
let patientEditIndex = -1;

function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;
    let phone = document.getElementById("pphone") ? document.getElementById("pphone").value : "";

    if (!name || !age) {
        alert("Please fill required fields");
        return;
    }

    let patient = { name, age, disease, phone };
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    if (patientEditIndex === -1) {
        patients.push(patient);
    } else {
        patients[patientEditIndex] = patient;
        patientEditIndex = -1;
    }

    localStorage.setItem("patients", JSON.stringify(patients));
    clearPatientForm();
    loadPatients();
}

function loadPatients() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let table = document.getElementById("patientTable") || document.getElementById("tableBody");
    if (!table) return;

    let output = "";
    patients.forEach((p, index) => {
        output += `
        <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            ${p.phone !== undefined ? `<td>${p.phone}</td>` : ""}
            <td>
                <button class="edit" onclick="editPatient(${index})">Edit</button>
                <button class="delete" onclick="deletePatient(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
    table.innerHTML = output;
}

function deletePatient(index) {
    if (confirm("Delete this patient?")) {
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        loadPatients();
    }
}

function editPatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let p = patients[index];

    document.getElementById("pname").value = p.name;
    document.getElementById("page").value = p.age;
    document.getElementById("pdisease").value = p.disease;
    if (document.getElementById("pphone")) document.getElementById("pphone").value = p.phone;

    patientEditIndex = index;
}

function searchPatient() {
    let value = (document.getElementById("search") || document.getElementById("searchAppointment")).value.toLowerCase();
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    let filtered = patients.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.disease.toLowerCase().includes(value)
    );

    let table = document.getElementById("patientTable") || document.getElementById("tableBody");
    if (table) {
        let output = "";
        filtered.forEach((p, index) => {
            output += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                ${p.phone !== undefined ? `<td>${p.phone}</td>` : ""}
                <td>
                    <button class="edit" onclick="editPatient(${index})">Edit</button>
                    <button class="delete" onclick="deletePatient(${index})">Delete</button>
                </td>
            </tr>
            `;
        });
        table.innerHTML = output;
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
let doctorEditIndex = -1;

function saveDoctor() {
    let name = document.getElementById("dname").value;
    let specialization = document.getElementById("dspecial").value;
    let experience = document.getElementById("dexp").value;

    if (!name) return;

    let doctor = { name, specialization, experience };
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    if (doctorEditIndex === -1) {
        doctors.push(doctor);
    } else {
        doctors[doctorEditIndex] = doctor;
        doctorEditIndex = -1;
    }

    localStorage.setItem("doctors", JSON.stringify(doctors));
    clearDoctorForm();
    displayDoctors();
}

function displayDoctors() {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let table = document.getElementById("doctorTable");
    if (!table) return;

    let output = "";
    doctors.forEach((d, index) => {
        output += `
        <tr>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.experience} yrs</td>
            <td>
                <button class="edit" onclick="editDoctor(${index})">Edit</button>
                <button class="delete" onclick="deleteDoctor(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
    table.innerHTML = output;
}

function deleteDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.splice(index, 1);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    displayDoctors();
}

function editDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let d = doctors[index];

    document.getElementById("dname").value = d.name;
    document.getElementById("dspecial").value = d.specialization;
    document.getElementById("dexp").value = d.experience;

    doctorEditIndex = index;
}

function clearDoctorForm() {
    document.getElementById("dname").value = "";
    document.getElementById("dspecial").value = "";
    document.getElementById("dexp").value = "";
}

/* ==========================================================================
   APPOINTMENT MANAGEMENT
   ========================================================================== */
let appointmentEditIndex = -1;

function saveAppointment() {
    let patient = document.getElementById("apatient").value;
    let doctor = document.getElementById("adoctor").value;
    let date = document.getElementById("adate").value;
    let time = document.getElementById("atime").value;

    let appointment = { patient, doctor, date, time };
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (appointmentEditIndex === -1) {
        appointments.push(appointment);
    } else {
        appointments[appointmentEditIndex] = appointment;
        appointmentEditIndex = -1;
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));
    clearAppointmentForm();
    displayAppointments();
}

function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let table = document.getElementById("appointmentTable");
    if (!table) return;

    let output = "";
    appointments.forEach((a, index) => {
        output += `
        <tr>
            <td>${a.patient}</td>
            <td>${a.doctor}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>
                <button class="edit" onclick="editAppointment(${index})">Edit</button>
                <button class="delete" onclick="deleteAppointment(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
    table.innerHTML = output;
}

function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments();
}

function editAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let a = appointments[index];

    document.getElementById("apatient").value = a.patient;
    document.getElementById("adoctor").value = a.doctor;
    document.getElementById("adate").value = a.date;
    document.getElementById("atime").value = a.time;

    appointmentEditIndex = index;
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
function generateBill() {
    alert("Bill Generated Successfully!");
}

function displayBills() {
    // Placeholder for bill listing if needed
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

        if (user === "admin" && pass === "admin123") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid Credentials!");
        }
    });
}