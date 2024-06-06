id = window.localStorage.getItem('itemId');
var img 

document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    // Ensure the element exists
    console.log("ssss"+id)
    const productNameElement = document.getElementById('productname');
    if (productNameElement) {
        productNameElement.innerText = " "+id;
    } else {
        console.error('Element with ID "productname" not found');
    }
});
  document.addEventListener('DOMContentLoaded', async function () {
    const token = window.localStorage.getItem("Token");

    try {
        // Fetch the data from the API
        const response = await fetch('http://127.0.0.1:5000/api/products/ '+ id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

        });
        
        if (response.ok) {
            const data = await response.json();

            
            if (data.length > 0) {
                // Extract the path from the response
                const imagePath = data[0].path;
                img = imagePath;
                // Construct the URL for the image
                const imageUrl = `http://127.0.0.1:5000/image?filename=${imagePath}`;
                // Get the carousel inner element
                const carouselInner = document.getElementById('carousel-inner');
                // Create a new div for the carousel item
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item', 'active'); // Assuming this is the only item and should be active
                // Create the img element
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.classList.add('d-block', 'w-100');
                imgElement.alt = '...';
                // Append the img to the carousel item
                carouselItem.appendChild(imgElement);
                // Append the carousel item to the carousel inner
                carouselInner.appendChild(carouselItem);
            } else {
                console.error('No data found');
            }
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function fetchData() {
    try {
      lots = window.localStorage.getItem('id_lotspage');
      console.log(lots)
      const response = await fetch("http://127.0.0.1:5000/api/graphproduct/"+id, {
          method: ["GET"],
          headers: {
              "Authorization": `Bearer `+window.localStorage.getItem("Token")
          }
      });
      
      const data = await response.json();

      // Parse the received data
      const apiData = data[0];
      const labels = ["เมล็ดแตกสะอาด: "+parseInt(apiData.CountBreakClean), 
      "เมล็ดสมบูรณ์: "+parseInt(apiData.CountCompleteSeeds), 
      "ฝุ่นซังแตกหยิม: "+parseInt(apiData.CountDust), 
      "เมล็ดเป็นราแบบมีสปอร์รา: "+parseInt(apiData.CountMoldSpores), 
      "เมล็ดเสียปกติ: "+parseInt(apiData.Countbroken), 
      "เมล็ดเสียเต็มเมล็ด: "+parseInt(apiData.Countfullbrokenseeds)];
      const values = [
        parseFloat(apiData.BreakClean),
        parseFloat(apiData.CompleteSeeds),
        parseFloat(apiData.Dust),
        parseFloat(apiData.MoldSpores),
        parseFloat(apiData.broken),
        parseFloat(apiData.fullbrokenseeds)
      ];

      // Update the chart with the new data
      updateChart(labels, values);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function updateChart(labels, data) {
    const ctx = document.getElementById("myPieChart").getContext("2d");
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "My Pie Chart",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(0, 0, 0, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(0, 0, 0, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (label) {
                  label += ": ";
                }
                label += context.raw+"%";
                return label;
              },
            },
          },
        },
      },
    });
  }

  function deleteproducts() {
   
    const dataToSend = {
      file: img
    };
  
    fetch('http://127.0.0.1:5000/api/products/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.file)
      if (data.file) {
        Swal.fire({
          icon: "success",
          title: "การลบproduct:"+id,
          text: "product: "+id+"ถูกลบเสร็จสมบูรณ์"
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "การลบproduct:"+id,
          text: "product: "+id+"ถูกลบไม่เสร็จสมบูรณ์"
        })
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the lot.');
    });
  }function goBack() {
    window.history.back();
  }
  