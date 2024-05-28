
document.addEventListener('DOMContentLoaded', function() {
    // URL ของ API
    const apiUrl = 'http://127.0.0.1:5000/api/user';

    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    async function fetchData() {
        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
          });
          const data = await response.json();
          if (Array.isArray(data.myresult)) {
            // ตรวจสอบว่าข้อมูลที่ได้รับเป็นอาร์เรย์หรือไม่
            populateTable(data.myresult);
          } else {
            console.error("Error: Data is not an array");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
    // ฟังก์ชันสำหรับเพิ่มข้อมูลลงในตาราง
    function populateTable(data) {
      const table = document.getElementById('data-table');
      data.forEach(item => {
          const row = table.insertRow();
          const idCell = row.insertCell(0);
          const nameCell = row.insertCell(1);
          const passCell = row.insertCell(2);
          const RoleCell = row.insertCell(3);
          const updateCell = row.insertCell(4);
          const deleteCell = row.insertCell(5);
  

          idCell.textContent = item.id;
          nameCell.textContent = item.name;
          passCell.textContent = item.password;
          RoleCell.textContent = item.Role;
          const updateButton = document.createElement('button');
          updateButton.textContent = 'update';
          updateButton.className = 'update-button';
          updateButton.onclick = () => updateItem(item.id);
          updateCell.appendChild(updateButton);
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'delete';
          deleteButton.className = 'delete-button'; 
          deleteButton.onclick = () => deleteItem(item.id,item.name);
          deleteCell.appendChild(deleteButton);
      });
    }
  
  
    // ฟังก์ชันสำหรับอัพเดทข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    function updateItem(id) {
      console.log(`Update item with ID: ${id}`);
      window.localStorage.setItem('id_user',id);
      window.open('updateuser.html','_self');
      // เพิ่มโค้ดเพื่อจัดการการอัพเดท
    }
  
    // ฟังก์ชันสำหรับลบข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    function deleteItem(id,name) {
      console.log(`Delete item with ID: ${id}`);
      Swal.fire({
        title: "Good job!",
        text: `ลบ  ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteuser(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Option 2 is clicked (or cancel button is clicked)
          // Handle Option 2 action here
        }
      });
      
      // เพิ่มโค้ดเพื่อจัดการการลบ
    }
  
    // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลและเพิ่มลงในตาราง
    fetchData();
  });


  function deleteuser(id){
    const dataToSend = {
      id: id,
    };
    fetch('http://127.0.0.1:5000/api/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + window.localStorage.getItem("Token")
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.rowcount > 0) {
        window.open('userall.html', '_self');
      } else {
        console.log('Failed to delete user.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the user.');
    });
  };

  
  

  