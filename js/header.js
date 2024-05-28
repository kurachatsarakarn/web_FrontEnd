document.addEventListener("DOMContentLoaded", function () {
    Role = window.localStorage.getItem('Role');
    user = window.localStorage.getItem('username');
    console.log("ssssss" + user);

    if (Role === "admin") {
        header = "/html/header/admin.html";
    }
    else {
        header = "/html/header/user.html";
    }
    fetch(header)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;
            document.getElementById("header-use").textContent = user;
        })
        .catch((error) => console.error("Error fetching HTML:", error));

});
