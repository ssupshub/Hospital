let editIndex = -1;

// SAVE / UPDATE
function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;
    let phone = document.getElementById("pphone").value;

    if (!name || !age) {
        alert("Please fill required fields");
        return;
    }

    let patient = { name, age, disease, phone };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    if (editIndex === -1) {
        patients.push(patient);
    } else {
        patients[editIndex] = patient;
        editIndex = -1;
    }

    localStorage.setItem("patients", JSON.stringify(patients));

    clearForm();
    loadPatients();
}

// LOAD DATA
function loadPatients() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    displayPatients(patients);
}

// DISPLAY
function displayPatients(data) {
    let output = "";

    data.forEach((p, index) => {
        output += `
        <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            <td>${p.phone}</td>
            <td>
                <button class="edit" onclick="editPatient(${index})">Edit</button>
                <button class="delete" onclick="deletePatient(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("patientTable").innerHTML = output;
}

// DELETE
function deletePatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    if (confirm("Delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        loadPatients();
    }
}

// EDIT
function editPatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    let p = patients[index];

    document.getElementById("pname").value = p.name;
    document.getElementById("page").value = p.age;
    document.getElementById("pdisease").value = p.disease;
    document.getElementById("pphone").value = p.phone;

    editIndex = index;
}

// SEARCH
function searchPatient() {
    let value = document.getElementById("search").value.toLowerCase();

    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    let filtered = patients.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.disease.toLowerCase().includes(value) ||
        p.phone.includes(value)
    );

    displayPatients(filtered);
}

// CLEAR
function clearForm() {
    document.getElementById("pname").value = "";
    document.getElementById("page").value = "";
    document.getElementById("pdisease").value = "";
    document.getElementById("pphone").value = "";
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}