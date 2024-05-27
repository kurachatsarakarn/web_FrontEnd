document.addEventListener('DOMContentLoaded', function() {
    // ดึงค่า id จาก URL query parameter
    
    id = window.localStorage.getItem('itemId');

    // แสดงค่า id ใน console log
    console.log('ID:', id);
  });
