function saveDoctor() {
    let name = document.getElementById("dname").value;
    localStorage.setItem("doctor", name);
    alert("Doctor Saved");
}