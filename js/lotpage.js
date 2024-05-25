document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/api/lots/1')
      .then(response => response.json())
      .then(data => {
        const cardsContainer = document.getElementById('cards-container');
        data.forEach(item => {
          const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;
          
          const card = document.createElement('div');
          card.className = 'col-sm-3';
          card.innerHTML = `
            <div class="card mb-5">
              <img src="${imageUrl}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">สถานะ : โสด</h5>
                <h5 class="card-second">ชื่อ :  ${item.lots}</h5>
                <p class="card-text"> Date: ${new Date(item.date).toLocaleDateString()}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          `;
          cardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  