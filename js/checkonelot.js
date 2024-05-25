// Fetch data from the API
lots = window.localStorage.getItem('id_lotspage');
console.log(lots)
fetch('http://127.0.0.1:5000/api/lotId/'+lots)
    .then(response => response.json())
    .then(data => {
        // Extract data from the API response
        const { name } = data[0];
        

        // Display ID Lots value
        document.getElementById('idLotsValue').innerText = `Name: ${name}`;
    })
    .catch(error => console.error('Error fetching data:', error));

    // document.getElementById("btn btn-success").onclick = function(){
        
    // }
