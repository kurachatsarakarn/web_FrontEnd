
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
          updateButton.onclick = () => updateItem(item.id,item.name);
          updateCell.appendChild(updateButton);
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'delete';
          deleteButton.className = 'delete-button'; 
          deleteButton.onclick = () => deleteItem(item.id);
          deleteCell.appendChild(deleteButton);
      });
    }
  
  
    // ฟังก์ชันสำหรับอัพเดทข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    // Async function to update item
    // Async function to update item
    async function updateItem(id, name) {
      const { value: formValues } = await Swal.fire({
        title: 'Update lot',
        html: `
          <div class="box-update">
            <input id="update-id" class="swal2-input" value="${id}" readonly>
            <input id="update-name" class="swal2-input" value="${name}">
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('update-id').value,
            document.getElementById('update-name').value
          ];
        },
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      const dataToSend = {
        name: document.getElementById('update-name').value,
        id:document.getElementById('update-id').value,
      };
    
      fetch('http://127.0.0.1:5000/api/lots', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer "+window.localStorage.getItem("Token")
        },
        body: JSON.stringify(dataToSend)
      })

      if (formValues) {
        const [updatedId, updatedName] = formValues;

        
        Swal.fire({
          title: 'แก้ไขข้อมูลสำเร็จ!',
          html: `
            <p>ID: <strong>${updatedId}</strong></p>
            <p>Name: <strong>${updatedName}</strong></p>
          `,
          icon: 'success'
        }).then(() => {
          window.location.reload();
        });
        

        // Update the table row with the new values
        const table = document.getElementById('data-table');
        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
          const row = rows[i];
          const updateButton = row.cells[2].getElementsByTagName('button')[0];
          if (updateButton && updateButton.onclick.toString().includes(`updateItem(${id})`)) {
            row.cells[0].textContent = updatedName;
            break;
          }
        }
      }
    }

  
    // ฟังก์ชันสำหรับลบข้อมูล (คุณต้องเพิ่มฟังก์ชันจริง)
    // Function to delete item
    function deleteItem(id) {
      // Confirm deletion with a popup
      Swal.fire({
        title: 'ตรวจสอบข้อมูลให้แน่ใจก่อนลบ',
        text: 'หากลบข้อมูลจะไม่สามารถคืนค่าได้',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          // If user confirms deletion
          fetch(`http://127.0.0.1:5000/api/lots/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // If deletion is successful
            Swal.fire({
              title: 'ข้อมูลถูกลบแล้ว!',
              text: 'ข้อมูลจะไม่สามารถคืนค่าได้',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              // Remove the row from the table
              const table = document.getElementById('data-table');
              const rows = table.getElementsByTagName('tr');
              for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
                const row = rows[i];
                const deleteButton = row.cells[3].getElementsByTagName('button')[0];
                if (deleteButton && deleteButton.onclick.toString().includes(`deleteItem(${id})`)) {
                  table.deleteRow(i);
                  break;
                }
              }
            }).then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            // If an error occurs during deletion
            console.error('There was an error!', error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting your item. Please try again later.',
              icon: 'error'
            });
          });
        }
      });
    }

  
    // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลและเพิ่มลงในตาราง
    fetchData();
  });
  
  //สร้างlot
  function createlot() {
    const lotName = document.getElementById('newlot').value;
  
    if (!lotName) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถสร้างล็อตได้',
        text: 'กรุณาใส่ชื่อล็อต',
      });
      return;
    }
  
    const dataToSend = {
      name: lotName // Assuming you want to send the input value as the 'date'
    };
  
    fetch('http://127.0.0.1:5000/api/lots', {
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
          icon: 'success',
          title: 'ล็อตถูกสร้าง: '+lotName,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
        document.getElementById('newlot').value = ''; // Clear the input field
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create lot.',
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while creating the lot.',
      });
    });
  }
  
  
  

  