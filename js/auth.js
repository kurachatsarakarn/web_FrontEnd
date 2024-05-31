Token = window.localStorage.getItem("Token");
Role = window.localStorage.getItem("Role");
console.log("Role= " + Role);
console.log("Token=" + Token);
if (!Role) {
  window.open("login.html", "_self");
  console.log("ssss");
}


function logout() {
  const token = window.localStorage.getItem("Token");

  fetch("http://127.0.0.1:5000/api/logout", {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    window.localStorage.clear();
    
    Swal.fire({
      icon: "success",
      title: "Logout สำเร็จ",
    }).then(() => {
      window.open("login.html", "_self");
    });
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: "error",
      title: "Logout ไม่สำเร็จ",
      text: error.message,
    });
  });
}
