document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/api/lots/1')
      .then(response => response.json())
      .then(data => {
        const cardsContainer = document.getElementById('cards-container');
        data.forEach(item => {
          const imageUrl = `http://127.0.0.1:5000/image?filename=${item.path}`;
          
          let col = ''
          if(item.status == null){
            item.status = "รอการตรวจสอบ"
            col = 'yellow'}
          else if(item.status == "อนุมัติแล้ว"){
             col = 'green'}
          else if(item.status == "ถูกปฏิเสธ"){
             col = 'red'}
          const card = document.createElement('div');
          card.className = 'col-sm-3';
          card.innerHTML = `
            <div class="card mb-5">
              <img src="${imageUrl}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-status">สถานะ : <span class="${col}">${item.status}</span></h5>
                <h5 class="card-second">ชื่อ :  ${item.lots}</h5>
                <p class="card-text"> Date: ${new Date(item.date).toLocaleDateString()}</p>
                <a href="check_all.html" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          `;
          cardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  