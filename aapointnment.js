let editAppointmentIndex = -1;

// BOOK APPOINTMENT
function saveAppointment() {
    let patient = document.getElementById("apatient").value;
    let doctor = document.getElementById("adoctor").value;
    let date = document.getElementById("adate").value;
    let time = document.getElementById("atime").value;

    let appointment = { patient, doctor, date, time };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (editAppointmentIndex === -1) {
        appointments.push(appointment);
    } else {
        appointments[editAppointmentIndex] = appointment;
        editAppointmentIndex = -1;
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));

    clearAppointmentForm();
    displayAppointments();
}

// DISPLAY APPOINTMENTS
function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let output = "";

    appointments.forEach((a, index) => {
        output += `
        <tr>
            <td>${a.patient}</td>
            <td>${a.doctor}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>
                <button onclick="editAppointment(${index})">Edit</button>
                <button onclick="deleteAppointment(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("appointmentTable").innerHTML = output;
}

// DELETE
function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments();
}

// EDIT
function editAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let a = appointments[index];

    document.getElementById("apatient").value = a.patient;
    document.getElementById("adoctor").value = a.doctor;
    document.getElementById("adate").value = a.date;
    document.getElementById("atime").value = a.time;

    editAppointmentIndex = index;
}

// SEARCH
function searchAppointment() {
    let value = document.getElementById("searchAppointment").value.toLowerCase();

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let filtered = appointments.filter(a =>
        a.patient.toLowerCase().includes(value) ||
        a.doctor.toLowerCase().includes(value)
    );

    let output = "";

    filtered.forEach((a, index) => {
        output += `
        <tr>
            <td>${a.patient}</td>
            <td>${a.doctor}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>
                <button onclick="editAppointment(${index})">Edit</button>
                <button onclick="deleteAppointment(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("appointmentTable").innerHTML = output;
}

// CLEAR FORM
function clearAppointmentForm() {
    document.getElementById("apatient").value = "";
    document.getElementById("adoctor").value = "";
    document.getElementById("adate").value = "";
    document.getElementById("atime").value = "";
}