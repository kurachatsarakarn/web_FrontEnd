
document.addEventListener('DOMContentLoaded', function() {
    // URL ของ API
    const apiUrl = 'http://127.0.0.1:5000/api/lots';
  
    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    async function fetchData() {
      try {
        const response = await fetch(apiUrl,{
          method: "GET",
          headers:{
            "Authorization": "Bearer "+window.localStorage.getItem("Token")
          }
        });
        const data = await response.json();
        populateTable(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // ฟังก์ชันสำหรับเพิ่มข้อมูลลงในตาราง
    function populateTable(data) {
      const table = document.getElementById('data-table');
      data.forEach(item => {
          const row = table.insertRow();
          const nameCell = row.insertCell(0);
          const dateCell = row.insertCell(1);
          const updateCell = row.insertCell(2);
          const deleteCell = row.insertCell(3);
  
          nameCell.textContent = item.name;
          dateCell.textContent = new Date(item.date).toLocaleDateString();
  
          const updateButton = document.createElement('button');
          updateButton.textContent = 'update';
          updateButton.className = 'update-button';
          updateButton.onclick = () => updateItem(item.id);
          updateCell.appendChild(updateButton);
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'delete';
          deleteButton.className = 'delete-button'; // แก้ชื่อคลาสให้ถูกต้อง
          deleteButton.onclick = () => deleteItem(item.id);
          deleteCell.appendChild(deleteButton);
      });
    }
  
  
    // ฟังก์ชันสำหรับอัพเดทข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    function updateItem(id) {
      console.log(`Update item with ID: ${id}`);
      // เพิ่มโค้ดเพื่อจัดการการอัพเดท
    }
  
    // ฟังก์ชันสำหรับลบข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    function deleteItem(id) {
      console.log(`Delete item with ID: ${id}`);
      // เพิ่มโค้ดเพื่อจัดการการลบ
    }
  
    // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลและเพิ่มลงในตาราง
    fetchData();
  });
  
  //สร้างlot
  function createlot() {
    const lotName = document.getElementById('newlot').value;
  
    if (!lotName) {
      alert('กรุณาใส่ชื่่อล็อต');
      return;
    }
  
    const dataToSend = {
      name: lotName // Assuming you want to send the input value as the 'date'
    };
  
    fetch('http://127.0.0.1:5000/api/lots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.rowcount > 0) {
        alert('Lot created successfully!');
        document.getElementById('newlot').value = ''; // Clear the input field
      } else {
        alert('Failed to create lot.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the lot.');
    });
  }
  

  