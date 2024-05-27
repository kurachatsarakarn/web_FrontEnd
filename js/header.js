document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("1").innerHTML = data;
    })
    .catch((error) => console.error("Error fetching HTML:", error));
});
