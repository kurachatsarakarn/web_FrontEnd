var current_page = 1;
var total_pages; // Set to total number of pages

async function getpage() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/lots/sum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.sum);
    return data.sum;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function initPage() {
    total_pages = await getpage();
  console.log("sss= " + current_page);
  selectpage();
  var value = document.getElementById("page");
  var totalPagesSpan = document.getElementById("total-pages");
console.log(total_pages);
  if (total_pages === null) {
    value.value = 0;
    totalPagesSpan.textContent = "/0";
  } else {
    value.value = current_page;
    totalPagesSpan.textContent = "/" + total_pages;
  }
}

function selectpage() {
  let next = document.getElementById("next");
  let previous = document.getElementById("previous");
  let value = document.getElementById("page"); // Define value here

  next.onclick = function () {
    if (total_pages === null || current_page >= total_pages) {
      console.log("เกินละไอโง่");
    } else {
      current_page = parseInt(current_page) + 1; // Convert to integer before adding
      value.value = current_page; // Use value here
      console.log("next page", current_page);
    }
  };

  previous.onclick = function () {
    if (total_pages === null || current_page <= 1) {
      console.log("ติดลบไม่ได้ไอโง่");
    } else {
      current_page = parseInt(current_page) - 1; // Convert to integer before subtracting
      value.value = current_page; // Use value here
      console.log("previous page", current_page);
    }
  };
}

function handleKeyPress(event, value) {
    if (event.keyCode === 13) {
      let newValue = parseInt(value.value); // Convert to integer
  
      if (
        total_pages === null ||
        isNaN(newValue) ||
        newValue > total_pages ||
        newValue < 1
      ) {
        value.value = current_page;
        console.log("Invalid page number");
      } else {
        current_page = newValue;
        value.value = current_page;
        console.log("Page set to", current_page);
      }
  
      console.log("Enter key pressed!");
    }
  }

// Call the initPage function to initialize the page correctly
initPage();