window.onload = function () {
  const update = document.getElementById("updateuser");
  const id_user = window.localStorage.getItem("id_user");
  console.log(id_user);
  getuser_id(id_user);

  update.addEventListener("click", function () {
    updateuser(id_user);
  });
};

function getuser_id(id) {
  const url = "http://127.0.0.1:5000/api/user/" + id;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("Token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const user = data.myresult;
      console.log(user.name);
      document.getElementById("username").value = user.name;
      document.getElementById("password").value = user.password;
      document.getElementById("Role").value = user.Role;
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}


function updateuser(id_user) {
  const dataToSend = {
    name: document.getElementById("username").value,
    password: document.getElementById("password").value,
    Role: document.getElementById("Role").value,
    id: id_user,
  };
  if(document.getElementById('username').value === "" || document.getElementById('password').value === "" ||
      document.getElementById('username').value === " " || document.getElementById('password').value === " "){
        
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูล",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน"
        }).then(() => {
          window.open('userall.html', '_self');
       });
      }
      else{fetch("http://127.0.0.1:5000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("Token"),
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.rowcount > 0) {
            Swal.fire({
              icon: 'success',
              title: 'การแก้ไขสำเร็จ!',
              text: 'คุณได้แก้ไขเรียบร้อย!',
              confirmButtonText: 'OK'
            }).then(() => {
              window.open("userall.html", "_self");
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ถูกปฏิเสธ!',
              text: 'คุณยังไม่ได้แก้ไขผู้ใช้.',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while updating the user.',
            confirmButtonText: 'OK'
          });
        });}
  
}

