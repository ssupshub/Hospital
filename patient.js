// ADD PATIENT
function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;
    let phone = document.getElementById("pphone").value;

    fetch("http://127.0.0.1:5000/addPatient", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age, disease, phone })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadPatients();
    });
}

// LOAD
function loadPatients() {
    fetch("http://127.0.0.1:5000/getPatients")
    .then(res => res.json())
    .then(data => {
        let output = "";

        data.forEach((p) => {
            output += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                <td>${p.phone}</td>
                <td>
                    <button onclick="deletePatient(${p.id})">Delete</button>
                </td>
            </tr>
            `;
        });

        document.getElementById("patientTable").innerHTML = output;
    });
}

// DELETE
function deletePatient(id) {
    fetch(`http://127.0.0.1:5000/deletePatient/${id}`, {
        method: "DELETE"
    })
    .then(() => loadPatients());
}