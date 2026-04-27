const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database (for project)
let patients = [];

// ➕ ADD PATIENT
app.post("/addPatient", (req, res) => {
    const patient = req.body;
    patients.push(patient);
    res.send({ message: "Patient added successfully" });
});

// 📋 GET ALL PATIENTS
app.get("/getPatients", (req, res) => {
    res.send(patients);
});

// ❌ DELETE PATIENT
app.delete("/deletePatient/:id", (req, res) => {
    const id = req.params.id;
    patients.splice(id, 1);
    res.send({ message: "Patient deleted" });
});

// SERVER START
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});