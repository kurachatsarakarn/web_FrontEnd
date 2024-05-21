// ดึงค่า urlToSend จาก URL
const file = window.localStorage.getItem("filename");
const numstr = window.localStorage.getItem("num");
let num = [];
let sum = 0;
num = JSON.parse(numstr);
console.log(num[1]);
console.log("sss")
document.getElementById('BreakClean').innerHTML = "เมล็ดแตกสะอาด: "+num[0];
document.getElementById('CompleteSeeds').innerHTML = "เมล็ดสมบูรณ์: " +num[1];
document.getElementById('Dust').innerHTML = "ฝุ่นซังแตกหยิม: " +num[2];
document.getElementById('MoldSpores').innerHTML = "เมล็ดเป็นราแบบมีสปอร์รา: " +num[3];
document.getElementById('broken').innerHTML = "เมล็ดเสียปกติ: " +num[4];
document.getElementById('fullbrokenseeds').innerHTML = "เมล็ดเสียเต็มเมล็ด: " +num[5];
for (let i = 0; i <= 5; i++) {
   sum += num[i];
}
document.getElementById('sum').innerHTML = "sum = "+sum;
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
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      window.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

fetchImage();