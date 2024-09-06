// Fetch data from the API
lots = window.localStorage.getItem('id_lotspage');
console.log(lots)
var lotname;
fetch('http://127.0.0.1:5000/api/lotId/'+lots,{
  method: "GET",
  headers:{
    "Authorization": "Bearer "+window.localStorage.getItem("Token")
  }
})
    .then(response => response.json())
    .then(data => {
        // Extract data from the API response
        const  name  = data[0].name;
        lotname = name;
        console.log("sss"+lotname);

        
        // Display ID Lots value
        document.getElementById('idLotsValue').innerText = `Name: ${name}`;

    })
    .catch(error => console.error('Error fetching data:', error));

    fetch('http://127.0.0.1:5000/api/lotstatusId/'+lots,{
      method: "GET",
      headers:{
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
      }
    })
    .then(response => response.json())
    .then(data => {
        // Extract data from the API response
        let { status } = data[0];
        
        
        if(status == null){
          status = "รอการตรวจสอบ"
        }

        // Display ID Lots value
        document.getElementById('LotStatus').innerText = ` ${status}`;
    })
    .catch(error => console.error('Error fetching data:', error));

    // document.getElementById("btn btn-success").onclick = function(){
        
    // }
    
    document.addEventListener('DOMContentLoaded', function() {
      const apiUrl = 'http://127.0.0.1:5000/api/lotId/'+lots;

      async function fetchData() {
        try {
          const response = await fetch(apiUrl,{
            method: "GET",
            headers:{
              "Authorization": "Bearer "+window.localStorage.getItem("Token")
            }
          });
          const data = await response.json();
          console.log(data);  // ตรวจสอบข้อมูลที่ดึงมาได้
          populateCarousel(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      function createCarouselItem(imageUrl, itemId,isActive) {
        const div = document.createElement('div');
        div.className = isActive ? 'carousel-item active' : 'carousel-item';

        const a = document.createElement('a');
        a.href = `check_lots.html`;
        a.value = 'itemId';

        a.addEventListener('click', function() {
        localStorage.setItem('itemId', itemId);
        });

        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'd-block w-100';
        img.alt = itemId;
        img.onload = function() {
          console.log(`Image loaded: ${img.src}`);  // ตรวจสอบเมื่อรูปภาพถูกโหลด
        };
        img.onerror = function() {
          console.error(`Image not found: ${img.src}`);  // ตรวจสอบเส้นทางของรูปภาพ
        };

        a.appendChild(img);
        div.appendChild(a);

        return div;
      }

      function populateCarousel(data) {
        const carouselInner = document.getElementById('carousel-inner');

        data.forEach((item, index) => {
          const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;
          const isActive = index === 0;
          const carouselItem = createCarouselItem(imageUrl, item.id, isActive);
          carouselInner.appendChild(carouselItem);
        });

        // ตรวจสอบว่า carousel ถูกเติมเต็มหรือไม่
        console.log(carouselInner.innerHTML);
      }

      fetchData();
    });

    let datenow = new Date().toJSON().slice(0, 10);
    console.log("test date: "+datenow)
    //////////// approve button
    function approve() {
      console.log("fsfsdf")

      const dataToSend = {
          idlot: lots,
          status: "อนุมัติแล้ว",
          date:datenow
      };
      console.log(lots)
  
      fetch('http://127.0.0.1:5000/api/status', { // เปลี่ยน URL ไปยัง API endpoint ของคุณ
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
          },
          body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
          if (data.rowcount) {
              // alert('การอนุมัติเสร็จสมบูรณ์');
              Swal.fire({
                icon: "success",
                title: "การอนุมัติเสร็จสมบูรณ์",
                text: "Lot: "+lotname+"ถูกเปลี่ยนสถานะเป็นอนุมัติ"
              }).then(() => {
                window.open("lot.html", "_self");
              });
              
          } else {
            Swal.fire({
              icon: "error",
              title: "การอนุมัติผิดพลาด",
              text: "Lot: "+lotname+"ไม่สามารถเปลี่ยนสถานะเป็นอนุมัติได้"
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
    }


    function reject() {
      console.log("fsfsdf")

      const dataToSend = {
          idlot: lots,
          status: "ถูกปฏิเสธ",
          date:datenow
      };
      console.log(lots)
  
      fetch('http://127.0.0.1:5000/api/status', { // เปลี่ยน URL ไปยัง API endpoint ของคุณ
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
          },
          body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
          if (data.rowcount) {
            Swal.fire({
              icon: "success",
              title: "การปฏิเสธเสร็จสมบูรณ์",
              text: "Lot: "+lotname+"ถูกเปลี่ยนสถานะเป็นปฏิเสธ"
            }).then(() => {
              window.open("lot.html", "_self");
            });
              
          } else {
            Swal.fire({
              icon: "error",
              title: "การปฏิเสธผิดพลาด",
              text: "Lot: "+lotname+"ไม่สามารถเปลี่ยนสถานะเป็นปฏิเสธได้"
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
    }

    function waitCheck() {
      console.log("fsfsdf")

      const dataToSend = {
          idlot: lots,
          status: "รอการตรวจสอบ",
          date:datenow
      };
      console.log(lots)
  
      fetch('http://127.0.0.1:5000/api/status', { // เปลี่ยน URL ไปยัง API endpoint ของคุณ
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
          },
          body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
          if (data.rowcount) {
            Swal.fire({
              icon: "success",
              title: "การรอตรวจสอบเสร็จสมบูรณ์",
              text: "Lot: "+lotname+"ถูกเปลี่ยนสถานะเป็นรอตรวจสอบ"
            }).then(() => {
              window.open("lot.html", "_self");
            });
              
          } else {
            Swal.fire({
              icon: "error",
              title: "การเปลี่ยนสถานะรอตรวจสอบผิดพลาด",
              text: "Lot: "+lotname+"ไม่สามารถเปลี่ยนสถานะเป็นรอตรวจสอบได้"
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
    }
    function goBack() {
      window.history.back();
    }
    