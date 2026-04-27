/* ==========================================================================
   DARK MODE
   ========================================================================== */
(function() {
    const saved = localStorage.getItem("theme");
    if (saved) { document.documentElement.setAttribute("data-theme", saved); }
})();

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = next === "dark" ? "L" : "D";
}

/* ==========================================================================
   CONFIG
   ========================================================================== */
// Automatically detect the API URL based on where the frontend is hosted.
// Works for both localhost development and AWS EC2 production.
const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

function goTo(page) { window.location.href = page; }
function logout() { localStorage.removeItem("loggedIn"); window.location.href = "login.html"; }

/* ==========================================================================
   PATIENT MANAGEMENT
   ========================================================================== */
let patientEditId = null;

async function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;
    let phone = document.getElementById("pphone") ? document.getElementById("pphone").value : "";
    if (!name || !age) { alert("Please fill required fields"); return; }

    let patient = { name, age, disease, phone };
    let url = patientEditId ? `${API_URL}/updatePatient/${patientEditId}` : `${API_URL}/addPatient`;
    let method = patientEditId ? "PUT" : "POST";

    try {
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(patient) });
        const data = await res.json();
        alert(data.message);
        patientEditId = null;
        clearPatientForm();
        loadPatients();
    } catch (err) { console.error("Error:", err); }
}

async function loadPatients() {
    try {
        const res = await fetch(`${API_URL}/getPatients`);
        const patients = await res.json();
        let table = document.getElementById("patientTable") || document.getElementById("tableBody");
        if (!table) return;
        let output = "";
        patients.forEach((p) => {
            output += `<tr>
                <td>${p.name}</td><td>${p.age}</td><td>${p.disease}</td>
                ${p.phone !== undefined ? `<td>${p.phone}</td>` : ""}
                <td class="action-btns">
                    <button class="btn-edit" onclick="editPatient('${p.id}')">Edit</button>
                    <button class="btn-delete" onclick="deletePatient('${p.id}')">Delete</button>
                </td></tr>`;
        });
        table.innerHTML = output;
    } catch (err) { console.error("Error:", err); }
}

async function deletePatient(id) {
    if (confirm("Delete this patient?")) {
        try { await fetch(`${API_URL}/deletePatient/${id}`, { method: "DELETE" }); loadPatients(); }
        catch (err) { console.error("Error:", err); }
    }
}

async function editPatient(id) {
    try {
        const res = await fetch(`${API_URL}/getPatients`);
        const patients = await res.json();
        let p = patients.find(item => item.id === id);
        document.getElementById("pname").value = p.name;
        document.getElementById("page").value = p.age;
        document.getElementById("pdisease").value = p.disease;
        if (document.getElementById("pphone")) document.getElementById("pphone").value = p.phone;
        patientEditId = id;
    } catch (err) { console.error("Error:", err); }
}

function searchPatient() {
    let value = document.getElementById("search").value.toLowerCase();
    let rows = document.getElementById("patientTable").querySelectorAll("tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
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
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(doctor) });
        const data = await res.json();
        alert(data.message);
        doctorEditId = null;
        clearDoctorForm();
        displayDoctors();
    } catch (err) { console.error("Error:", err); }
}

async function displayDoctors() {
    try {
        const res = await fetch(`${API_URL}/getDoctors`);
        const doctors = await res.json();
        let table = document.getElementById("doctorTable");
        if (!table) return;
        let output = "";
        doctors.forEach((d) => {
            output += `<tr>
                <td>${d.name}</td><td>${d.specialization}</td><td>${d.experience} yrs</td>
                <td class="action-btns">
                    <button class="btn-edit" onclick="editDoctor('${d.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteDoctor('${d.id}')">Delete</button>
                </td></tr>`;
        });
        table.innerHTML = output;
    } catch (err) { console.error("Error:", err); }
}

async function deleteDoctor(id) {
    try { await fetch(`${API_URL}/deleteDoctor/${id}`, { method: "DELETE" }); displayDoctors(); }
    catch (err) { console.error("Error:", err); }
}

async function editDoctor(id) {
    try {
        const res = await fetch(`${API_URL}/getDoctors`);
        const doctors = await res.json();
        let d = doctors.find(item => item.id === id);
        document.getElementById("dname").value = d.name;
        document.getElementById("dspecial").value = d.specialization;
        document.getElementById("dexp").value = d.experience;
        doctorEditId = id;
    } catch (err) { console.error("Error:", err); }
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

    try {
        const res = await fetch(`${API_URL}/addAppointment`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patient, doctor, date, time })
        });
        const data = await res.json();
        alert(data.message);
        clearAppointmentForm();
        displayAppointments();
    } catch (err) { console.error("Error:", err); }
}

async function displayAppointments() {
    try {
        const res = await fetch(`${API_URL}/getAppointments`);
        const appointments = await res.json();
        let table = document.getElementById("appointmentTable");
        if (!table) return;
        let output = "";
        appointments.forEach((a) => {
            output += `<tr>
                <td>${a.patient}</td><td>${a.doctor}</td><td>${a.date}</td><td>${a.time}</td>
                <td class="action-btns">
                    <button class="btn-delete" onclick="deleteAppointment('${a.id}')">Delete</button>
                </td></tr>`;
        });
        table.innerHTML = output;
    } catch (err) { console.error("Error:", err); }
}

async function deleteAppointment(id) {
    try { await fetch(`${API_URL}/deleteAppointment/${id}`, { method: "DELETE" }); displayAppointments(); }
    catch (err) { console.error("Error:", err); }
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
function calculateTotal() {
    let t = parseFloat(document.getElementById("btreatment").value) || 0;
    let m = parseFloat(document.getElementById("bmedicine").value) || 0;
    let d = parseFloat(document.getElementById("bdoctor").value) || 0;
    document.getElementById("total").innerText = "Total: Rs. " + (t + m + d);
}

async function saveBill() {
    let patient = document.getElementById("bpatient").value;
    let treatment = parseFloat(document.getElementById("btreatment").value) || 0;
    let medicine = parseFloat(document.getElementById("bmedicine").value) || 0;
    let doctor_fee = parseFloat(document.getElementById("bdoctor").value) || 0;

    try {
        const res = await fetch(`${API_URL}/addBill`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patient, treatment, medicine, doctor_fee })
        });
        const data = await res.json();
        alert("Bill Generated! Total: Rs." + data.total);
        document.getElementById("bpatient").value = "";
        document.getElementById("btreatment").value = "";
        document.getElementById("bmedicine").value = "";
        document.getElementById("bdoctor").value = "";
        document.getElementById("total").innerText = "Total: Rs. 0";
        displayBills();
    } catch (err) { console.error("Error:", err); }
}

async function displayBills() {
    try {
        const res = await fetch(`${API_URL}/getBills`);
        const bills = await res.json();
        let table = document.getElementById("billTable");
        if (!table) return;
        let output = "";
        bills.forEach((b) => {
            output += `<tr>
                <td>${b.patient}</td><td>Rs.${b.treatment}</td><td>Rs.${b.medicine}</td>
                <td>Rs.${b.doctor_fee}</td><td><strong>Rs.${b.total}</strong></td>
                <td class="action-btns">
                    <button class="btn-delete" onclick="deleteBill('${b.id}')">Delete</button>
                </td></tr>`;
        });
        table.innerHTML = output;
    } catch (err) { console.error("Error:", err); }
}

async function deleteBill(id) {
    try { await fetch(`${API_URL}/deleteBill/${id}`, { method: "DELETE" }); displayBills(); }
    catch (err) { console.error("Error:", err); }
}

/* ==========================================================================
   LOGIN
   ========================================================================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        if (user === "admin" && pass === "admin123") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else { alert("Invalid Credentials!"); }
    });
}

const toggleBtn = document.getElementById("togglePassword");
if (toggleBtn) {
    toggleBtn.addEventListener("click", function() {
        const passInput = document.getElementById("password");
        if (passInput.type === "password") { passInput.type = "text"; toggleBtn.textContent = "Hide"; }
        else { passInput.type = "password"; toggleBtn.textContent = "Show"; }
    });
}