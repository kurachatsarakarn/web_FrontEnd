var current_page = 1;
var total_pages; // Set to total number of pages
var current_function = "page";
Inputsearch = document.getElementById("searchInput");
search = document.getElementById("searchButton");
window.onload = function () {
  page(current_page);
  initPage();
};

search.onclick = function () {
  console.log(Inputsearch.value);
  current_function = "search";
  pagesearch(current_page, Inputsearch.value);
  console.log(current_function);
  initPage();
};
//gen page
function page(page) {
  fetch("http://127.0.0.1:5000/api/lots/" + page,{
    method: "GET",
    headers:{
      "Authorization": "Bearer "+window.localStorage.getItem("Token")
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      if (!cardsContainer) {
        console.error('Error: No element with id "cards-container" found.');
        return;
      }
      cardsContainer.innerHTML = "";
      data.forEach((item) => {
        const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;

        let col = "";
        if (item.status == null) {
          item.status = "รอการตรวจสอบ"; 
          col = "yellow";
        } else if (item.status === "รอการตรวจสอบ") {
          col = "yellow";
        } else if (item.status === "อนุมัติแล้ว") {
          col = "green";
        } else if (item.status === "ถูกปฏิเสธ") {
          col = "red";
        }
        
        const card = document.createElement("div");
        card.className = "col-sm-3";
        card.innerHTML = `
          <div class="card mb-5">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-status">สถานะ : <span class="${col}">${
          item.status
        }</span></h5>
              <h5 class="card-second">ชื่อ : ${item.lots}</h5>
              <p class="card-text"> Date: ${new Date(
                item.date
              ).toLocaleDateString()}</p>
              <input type="hidden" class="id_lots" value="${item.id}">
              <a href="#" class="btn btn-primary test-button">Go somewhere</a>
            </div>
          </div>
        `;

        cardsContainer.appendChild(card);
      });

      // Attach event listeners to buttons after they are added to the DOM
      document.querySelectorAll(".test-button").forEach((button) => {
        button.onclick = function () {
          const card = button.closest(".card-body");
          const lotIdInput = card.querySelector(".id_lots");
          console.log(lotIdInput.value);
          window.localStorage.setItem("id_lotspage", lotIdInput.value);
          window.open("/html/check_all.html", "_self");
        };
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

//gen page for search
function pagesearch(page, Inputsearch) {
  fetch("http://127.0.0.1:5000/api/lots/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+window.localStorage.getItem("Token")
    },
    body: JSON.stringify({ page: page, id: Inputsearch }),
  })
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      if (!cardsContainer) {
        console.error('Error: No element with id "cards-container" found.');
        return;
      }
      cardsContainer.innerHTML = "";
      data.forEach((item) => {
        const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;

        let col = "";
        if (item.status == null) {
          item.status = "รอการตรวจสอบ";
          col = "yellow";
        } else if (item.status == "อนุมัติแล้ว") {
          col = "green";
        } else if (item.status == "ถูกปฏิเสธ") {
          col = "red";
        }
        const card = document.createElement("div");
        card.className = "col-sm-3";
        card.innerHTML = `
          <div class="card mb-5">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-status">สถานะ : <span class="${col}">${
          item.status
        }</span></h5>
              <h5 class="card-second">ชื่อ : ${item.lots}</h5>
              <p class="card-text"> Date: ${new Date(
                item.date
              ).toLocaleDateString()}</p>
              <input type="hidden" class="id_lots" value="${item.id}">
              <a href="#" class="btn btn-primary test-button">Go somewhere</a>
            </div>
          </div>
        `;

        cardsContainer.appendChild(card);
      });

      // Attach event listeners to buttons after they are added to the DOM
      document.querySelectorAll(".test-button").forEach((button) => {
        button.onclick = function () {
          const card = button.closest(".card-body");
          const lotIdInput = card.querySelector(".id_lots");
          console.log(lotIdInput.value);
          window.localStorage.setItem("id_lotspage", lotIdInput.value);
          window.open("/html/check_all.html", "_self");
        };
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//gen sum page
async function getpage() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/lots/sum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
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
//gen page sum search
async function getpagesearch(Inputsearch) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/lots/search/sum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
      },
      body: JSON.stringify({ id: Inputsearch }),
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
  if (current_function === "page") {
    total_pages = await getpage();
    console.log("ssss");
  } else if (current_function === "search") {
    console.log("ffff");
    total_pages = await getpagesearch(Inputsearch.value);
  }
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
      if (current_function === "page") {
        console.log("next page = " + current_page);
        page(current_page);
      } else if (current_function === "search") {
        console.log("next search = " + current_page);
        pagesearch(current_page, Inputsearch.value);
      }
      console.log("next page", current_page);
    }
  };

  previous.onclick = function () {
    if (total_pages === null || current_page <= 1) {
      console.log("ติดลบไม่ได้ไอโง่");
    } else {
      current_page = parseInt(current_page) - 1; // Convert to integer before subtracting
      value.value = current_page; // Use value here
      if (current_function === "page") {
        console.log("next page = " + current_page);
        page(current_page);
      } else if (current_function === "search") {
        console.log("next search = " + current_page);
        pagesearch(current_page, Inputsearch.value);
      }
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
      console.log("ไม่ผ่าน");
    } else {
      current_page = newValue;
      value.value = current_page;
      if (current_function === "page") {
        console.log("next page = " + current_page);
        page(current_page);
      } else if (current_function === "search") {
        console.log("next search = " + current_page);
        pagesearch(current_page, Inputsearch.value);
      }
      console.log("Page set to", current_page);
    }

    console.log("Enter key pressed!");
  }
}
