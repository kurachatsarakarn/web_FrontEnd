document.addEventListener("DOMContentLoaded", function () {
  // URL ของ API
  const apiUrl = "http://127.0.0.1:5000/api/status";

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
    const table = document.getElementById("data-table");
    data.forEach((item) => {
      // แก้ไขจาก data เป็น data.myresult
      const row = table.insertRow();
      const nameCell = row.insertCell(0);
      const lotsCell = row.insertCell(1);
      const statusCell = row.insertCell(2);
      const dateCell = row.insertCell(3);
   

      nameCell.textContent = item.name;
      lotsCell.textContent = item.lots;
      dateCell.textContent = new Date(item.date).toLocaleDateString();
      statusCell.textContent = item.status;
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
