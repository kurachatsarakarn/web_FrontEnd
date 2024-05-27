var socket;
window.onload = function () {
  auth = window.localStorage.getItem("user");
  console.log("auth= " + auth);
  if (!auth) {
    window.open("login.html", "_self");
    console.log("ssss");
  }
  fetchAndPopulateSelect();
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  socket = io.connect("http://127.0.0.1:5000");
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      setInterval(sendFrame, 350);
    })
    .catch((err) => {
      console.error("Error accessing the camera: " + err);
    });

  function sendFrame() {
    console.log("Sending frame...");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    socket.emit("frame", imageData);
    socket.on("response", function (data) {
      document.getElementById("pic").src =
        "data:image/jpeg;base64," +
        btoa(String.fromCharCode.apply(null, new Uint8Array(data.frame)));
      document.getElementById("BreakClean").textContent =
        "เมล็ดแตกสะอาด: " + data.num[0];
      document.getElementById("CompleteSeeds").textContent =
        "เมล็ดสมบูรณ์: " + data.num[1];
      document.getElementById("Dust").textContent =
        "ฝุ่นซังแตกหยิม: " + data.num[2];
      document.getElementById("MoldSpores").textContent =
        "เมล็ดเป็นราแบบมีสปอร์รา: " + data.num[3];
      document.getElementById("broken").textContent =
        "เมล็ดเสียปกติ: " + data.num[4];
      document.getElementById("fullbrokenseeds").textContent =
        "เมล็ดเสียเต็มเมล็ด: " + data.num[5];
      document.getElementById("empty").textContent = "empty: " + data.num[6];
      // ข้อมูลอื่นๆ...
      document.getElementById("percent").textContent = "percent : "+ data.percent + "%"
      var sum = data.num.reduce((total, current) => total + current, 0);
      document.getElementById("sum").textContent = "sum: " + sum;

    
    });
  }
};
// ฟังก์ชันสำหรับการส่งรูปภาพและเก็บใน localStorage
function sendFrame_pic() {
  console.log("Sending frame...");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/jpeg");
  const dataToSend = {
    imageData: imageData,
  };
  fetch("http://127.0.0.1:5000/request_pic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.filename);
      window.localStorage.setItem("filename", data.filename);
      window.localStorage.setItem("num", JSON.stringify(data.num));
      window.localStorage.setItem("percent",data.percent)
      console.log(data.percent)
      // op =document.getElementById("option");
      // if(op)
      //   {
      //     window.localStorage.setItem("id_lots",op.value);
      //   }
      window.open("pic.html", "_blank");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout(){
  window.localStorage.clear();
  window.open("login.html","_self");
}

async function fetchAndPopulateSelect() {
  try {
    const selectElement = document.getElementById('mySelect');
    console.log('Fetching data from API...');
    
    // URL ของ API ที่จะใช้ fetch
    const apiUrl = 'http://127.0.0.1:5000/api/lots'; // เปลี่ยน URL นี้เป็น URL จริงของ API
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('Data received:', data);

    // ตรวจสอบโครงสร้างข้อมูลที่ได้มา
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.name && item.id) { // ตรวจสอบว่าออบเจ็กต์มี name และ id
          console.log('Adding option:', item);
          // สร้าง option element
          const option = document.createElement('option');
          option.value = item.id; // ตั้งค่า value เป็น id
          option.textContent = item.name; // ตั้งค่า text เป็น name

          // เพิ่ม option ไปยัง select element
          selectElement.appendChild(option);
        }
      });
    } else {
      console.error('รูปแบบข้อมูลไม่ถูกต้อง:', data);
    }

    // Add an event listener to handle selection changes
    selectElement.addEventListener('change', function () {
      lots = this.options[this.selectedIndex].textContent;
      console.log('Selected value:',lots);
      window.localStorage.setItem("lots",lots);
      window.localStorage.setItem("id_lots",this.value);
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
  }
}
