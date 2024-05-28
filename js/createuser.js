document.addEventListener('DOMContentLoaded', function() {
  const createUserButton = document.getElementById('createuser');
  if (createUserButton) {
    createUserButton.onclick = function() {
      const dataToSend = {
        name: document.getElementById('username').value,
        password: document.getElementById('password').value,
        Role: document.getElementById('Role').value
      };
      if(document.getElementById('username').value == "" || document.getElementById('password').value == ""){
        window.open('userall.html', '_self');
      }
      fetch('http://127.0.0.1:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + window.localStorage.getItem("Token")
        },
        body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
        if (data.rowcount > 0) {
          Swal.fire({
            icon: "success",
            title: "สร้างผู้ใช้สำเร็จ",
            text: "Id: "+document.getElementById('username').value+"ถูกสร้างแล้ว"
          }).then(() => {
            window.open('userall.html', '_self');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "สร้างผู้ใช้ไม่สำเร็จ",
            text: "Id: "+document.getElementById('username').value+"ไม่ได้ถูกสร้าง"
          })
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          icon: "warning",
          title: "เกิดข้อผิดพลาดในการเชื่อมต่อกับ API"
        })
      });
    };
  } else {
    console.error('Element with id "createuser" not found');
  }
});
