// SAVE MULTIPLE PATIENTS
function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;

    let patient = {
        name: name,
        age: age,
        disease: disease
    };

    // Get existing data
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    // Add new patient
    patients.push(patient);

    // Save back
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Patient Added Successfully!");

    displayPatients(); // auto refresh
}

// DISPLAY ALL PATIENTS
function displayPatients() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    let output = "";

    patients.forEach((p, index) => {
        output += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                <td>
                    <button onclick="deletePatient(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tableBody").innerHTML = output;
}

// DELETE PATIENT
function deletePatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    patients.splice(index, 1);

    localStorage.setItem("patients", JSON.stringify(patients));

    displayPatients();
}