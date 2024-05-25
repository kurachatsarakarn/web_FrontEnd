window.onload = function() {
  page();
};

function page() {
  fetch('http://127.0.0.1:5000/api/lots/1')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.getElementById('cards-container');
      if (!cardsContainer) {
        console.error('Error: No element with id "cards-container" found.');
        return;
      }
      
      data.forEach(item => {
        const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;
        if (item.status == null) { item.status = "รอการตรวจสอบ"; }
        
        const card = document.createElement('div');
        card.className = 'col-sm-3';
        card.innerHTML = `
          <div class="card mb-5">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">สถานะ : ${item.status}</h5>
              <h5 class="card-second">ชื่อ : ${item.lots}</h5>
              <p class="card-text">Date: ${new Date(item.date).toLocaleDateString()}</p>
              <input type="hidden" class="id_lots" value="${item.id}">
              <a href="#" class="btn btn-primary test-button">Go somewhere</a>
            </div>
          </div>
        `;
        
        cardsContainer.appendChild(card);
      });

      // Attach event listeners to buttons after they are added to the DOM
      document.querySelectorAll('.test-button').forEach(button => {
        button.onclick = function() {
          const card = button.closest('.card-body');
          const lotIdInput = card.querySelector('.id_lots');
          console.log(lotIdInput.value);
          window.localStorage.setItem("id_lotspage",lotIdInput.value);
          window.open('/html/check_all.html','_self');
        };
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
