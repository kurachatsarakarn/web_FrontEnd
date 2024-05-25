function createnumpage() {
  let currentPage = 3; // example current page number

  // Get the container where the pagination items will be inserted
  let paginationContainer = document.getElementById("pagination-container");

  // Generate pagination items and insert them before the 'Next' button
  for (let i = 1; i <= 5; i++) {
    // Create a list item element
    let li = document.createElement("li");
    li.className = "page-item";

    // Add 'active' class if it is the current page
    if (i === currentPage) {
      li.classList.add("active");
    }

    // Create a link element
    let a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = i;

    // Append the link to the list item
    li.appendChild(a);

    // Insert the list item before the 'Next' button
    paginationContainer.insertBefore(li, paginationContainer.lastElementChild);
  }
}
