

function login() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  const dataToSend = { username, password };

  fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      // ตรวจสอบสถานะของการตอบกลับ
      if (!response.ok) {
        // ถ้าสถานะไม่ใช่ 2xx, ขว้างข้อผิดพลาดพร้อมข้อความสถานะ
        Swal.fire({
          icon: "error",
          title: "Login fail",
        })
        return response.json().then((data) => {
          throw new Error(data.msg || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("ddd", data);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("Token", data.Token);
      window.localStorage.setItem("Role", data.Role);
      Swal.fire({
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.open("index.html", "_self");
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Login fail",
      })
      console.error("Error:", error);
      alert("Login failed: " + error.message);
    });
}
