function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123") {
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials");
    }
}