let current_page = 1;
let total_pages = 100; // Set to total number of pages
let value = document.getElementById('page');
let totalPagesSpan = document.getElementById('total-pages');

if (total_pages === null) {
    value.value = 0;
    totalPagesSpan.textContent = "/0";
} else {
    value.value = current_page;
    totalPagesSpan.textContent = "/" + total_pages;
}

function selectpage() {
    let next = document.getElementById("next");
    let previous = document.getElementById("previous");

    next.onclick = function () {
        if (total_pages === null || current_page >= total_pages) {
            console.log('เกินละไอโง่');
        } else {
            current_page = parseInt(current_page) + 1; // Convert to integer before adding
            value.value = current_page;
            console.log("next page", current_page);
        }
    };

    previous.onclick = function() {
        if (total_pages === null || current_page <= 1) {
            console.log('ติดลบไม่ได้ไอโง่');
        } else {
            current_page = parseInt(current_page) - 1; // Convert to integer before subtracting
            value.value = current_page;
            console.log("previous page", current_page);
        }
    };
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        let valuechange = document.getElementById('page');
        let newValue = parseInt(valuechange.value); // Convert to integer

        if (total_pages === null || isNaN(newValue) || newValue > total_pages || newValue < 1) {
            value.value = current_page;
            console.log('Invalid page number');
        } else {
            current_page = newValue;
            value.value = current_page;
            console.log("Page set to", current_page);
        }

        console.log("Enter key pressed!");
    }
}

selectpage();