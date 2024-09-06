window.onload = function () {
  fetchAndPopulateSelect();
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  socket = io.connect("http://127.0.0.1:5000");

  navigator.mediaDevices
    .getUserMedia({ video: { width: 800, height: 600 } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      setInterval(sendFrame,200);
      // requestAnimationFrame(sendFrame); // ใช้ requestAnimationFrame แทน setInterval
    })
    .catch((err) => {
      console.error("Error accessing the camera: " + err);
    });

  function sendFrame() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg", 0.5); // ลดคุณภาพของภาพ
    socket.emit("frame", imageData);
    socket.on("response", function (data) {
      document.getElementById("pic").src =
        "data:image/jpeg;base64," +
        btoa(String.fromCharCode.apply(null, new Uint8Array(data.frame)));
      document.getElementById("BreakClean").textContent =
        "A: " + data.num[0];
      document.getElementById("CompleteSeeds").textContent =
        "B: " + data.num[1];
      document.getElementById("Dust").textContent =
        "C: " + data.num[2];
      document.getElementById("MoldSpores").textContent =
        "D: " + 0;
      document.getElementById("broken").textContent =
        "E: " + data.num[3];
      document.getElementById("fullbrokenseeds").textContent =
        "F: " + data.num[4];
      document.getElementById("empty").textContent = "empty: "  ;
      document.getElementById("percent").textContent = "percent : " + data.percent + "%"
      var sum = data.num.reduce((total, current) => total + current, 0);
      document.getElementById("sum").textContent = "sum: " + sum;
    });
    // requestAnimationFrame(sendFrame); // เรียกซ้ำเพื่อส่งเฟรมต่อไป
  }
};

async function fetchAndPopulateSelect() {
  try {
    const selectElement = document.getElementById('mySelect');
    console.log('Fetching data from API...');
    const apiUrl = 'http://127.0.0.1:5000/api/lots'; 
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("Token")
      }
    });
    const data = await response.json();

    console.log('Data received:', data);

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.name && item.id) {
          console.log('Adding option:', item);
          const option = document.createElement('option');
          option.value = item.id; 
          option.textContent = item.name; 
          selectElement.appendChild(option);
        }
      });
      const id_lots = window.localStorage.getItem('id_lots');
      if (id_lots) {
        document.getElementById('mySelect').value = id_lots; 
      }
    } else {
      console.error('รูปแบบข้อมูลไม่ถูกต้อง:', data);
    }

    selectElement.addEventListener('change', function () {
      lots = this.options[this.selectedIndex].textContent;
      console.log('Selected value:', lots);
      window.localStorage.setItem("lots", lots);
      window.localStorage.setItem("id_lots", this.value);
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
  }
}

function sendFrame_pic() {
  if(!window.localStorage.getItem('id_lots')){
    Swal.fire({
      icon: "warning",
      title: "กรุณาเลือกlotก่อนทำการถ่าย"
    })
    throw new Error("กรุณาเลือกlost");
  }
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
      "Authorization": "Bearer "+window.localStorage.getItem("Token")
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
      window.open("pic.html", "_blank");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}