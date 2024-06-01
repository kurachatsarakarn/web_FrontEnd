const file = window.localStorage.getItem("filename");
console.log(file);
const numstr = window.localStorage.getItem("num");
const percent = window.localStorage.getItem("percent");
const id_lots = window.localStorage.getItem("id_lots");
const lot = window.localStorage.getItem("lots")
console.log("lots = "+lot)
let num = [];
let sum = 0;
num = JSON.parse(numstr);
console.log(num[1]);
console.log("sss");

document.getElementById("BreakClean").innerHTML = "เมล็ดแตกสะอาด: " + num[0];
document.getElementById("CompleteSeeds").innerHTML = "เมล็ดสมบูรณ์: " + num[1];
document.getElementById("Dust").innerHTML = "ฝุ่นซังแตกหยิม: " + num[2];
document.getElementById("MoldSpores").innerHTML =
  "เมล็ดเป็นราแบบมีสปอร์รา: " + 0;
document.getElementById("broken").innerHTML = "เมล็ดเสียปกติ: " + num[3];
document.getElementById("fullbrokenseeds").innerHTML =
  "เมล็ดเสียเต็มเมล็ด: " + num[4];
document.getElementById("percent").innerHTML = "percent : " + percent+"%";
for (let i = 0; i <= 4; i++) {
  sum += num[i];

  document.getElementById("lotValue").innerHTML = lot;
}
document.getElementById("sum").innerHTML = "sum = " + sum;
function fetchImage() {
  const url = `http://127.0.0.1:5000/image?filename=${encodeURIComponent(
    file
  )}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      document.getElementById("pic").src = objectURL;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function delete_capture() {
  const dataToSend = {
    filename: file,
  };
  fetch("http://127.0.0.1:5000/delete_capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+window.localStorage.getItem("Token")
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      let lot = window.localStorage.getItem("lots");
      // window.localStorage.removeItem("id_lots");
      
      // window.localStorage.removeItem("lots");
      Swal.fire({
        icon: "success",
        title: "ยกเลิกรูปภาพสำเร็จ",
        text: "รูปภาพจะถูกยกเลิกการบันทึกที่ lot: "+lot
      }).
      then(() => {
        window.close();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function save_capture() {
  user = window.localStorage.getItem("Token");
  console.log(file)
  console.log(num[0])
  console.log(user)
  const dataToSend = {
    id: id_lots,
    BreakClean: num[0],
    CompleteSeeds: num[1],
    Dust: num[2],
    MoldSpores: 0,
    broken: num[3],
    fullbrokenseeds: num[4],
    path: file,
  };
  fetch("http://127.0.0.1:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+window.localStorage.getItem("Token")
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      let lot = window.localStorage.getItem("lots");
      // window.localStorage.removeItem("id_lots");

      // window.localStorage.removeItem("lots");
      console.log("Success:", data);
      Swal.fire({
        icon: "success",
        title: "บันทึกรูปภาพสำเร็จ",
        text: "รูปภาพจะถูกบันทึกไปยัง lot: "+lot
      }).
      then(() => {
        window.close();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetchImage();
