let editDoctorIndex = -1;

// ADD / UPDATE DOCTOR
function saveDoctor() {
    let name = document.getElementById("dname").value;
    let specialization = document.getElementById("dspecial").value;
    let experience = document.getElementById("dexp").value;

    let doctor = { name, specialization, experience };

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    if (editDoctorIndex === -1) {
        doctors.push(doctor);
    } else {
        doctors[editDoctorIndex] = doctor;
        editDoctorIndex = -1;
    }

    localStorage.setItem("doctors", JSON.stringify(doctors));

    clearDoctorForm();
    displayDoctors();
}

// DISPLAY DOCTORS
function displayDoctors() {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    let output = "";

    doctors.forEach((d, index) => {
        output += `
        <tr>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.experience} yrs</td>
            <td>
                <button onclick="editDoctor(${index})">Edit</button>
                <button onclick="deleteDoctor(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("doctorTable").innerHTML = output;
}

// DELETE
function deleteDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.splice(index, 1);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    displayDoctors();
}

// EDIT
function editDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    let d = doctors[index];

    document.getElementById("dname").value = d.name;
    document.getElementById("dspecial").value = d.specialization;
    document.getElementById("dexp").value = d.experience;

    editDoctorIndex = index;
}

// SEARCH
function searchDoctor() {
    let value = document.getElementById("searchDoctor").value.toLowerCase();

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    let filtered = doctors.filter(d =>
        d.name.toLowerCase().includes(value) ||
        d.specialization.toLowerCase().includes(value)
    );

    let output = "";

    filtered.forEach((d, index) => {
        output += `
        <tr>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.experience} yrs</td>
            <td>
                <button onclick="editDoctor(${index})">Edit</button>
                <button onclick="deleteDoctor(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("doctorTable").innerHTML = output;
}

// CLEAR FORM
function clearDoctorForm() {
    document.getElementById("dname").value = "";
    document.getElementById("dspecial").value = "";
    document.getElementById("dexp").value = "";
}