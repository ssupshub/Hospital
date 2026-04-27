// ADD PATIENT
function savePatient() {
    let name = document.getElementById("pname").value;
    let age = document.getElementById("page").value;
    let disease = document.getElementById("pdisease").value;

    fetch("http://localhost:3000/addPatient", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age, disease })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        displayPatients();
    });
}

// GET PATIENTS
function displayPatients() {
    fetch("http://localhost:3000/getPatients")
    .then(res => res.json())
    .then(data => {
        let output = "";

        data.forEach((p, index) => {
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
    });
}

// DELETE
function deletePatient(id) {
    fetch(`http://localhost:3000/deletePatient/${id}`, {
        method: "DELETE"
    })
    .then(() => displayPatients());
}