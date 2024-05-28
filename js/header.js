document.addEventListener("DOMContentLoaded", function () {
    Role = window.localStorage.getItem('Role');
    if(Role === "admin"){
        header = "/html/header/admin.html";
    }
    else{
        header = "/html/header/user.html";
    }
    fetch(header)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    })
    .catch((error) => console.error("Error fetching HTML:", error));
});
