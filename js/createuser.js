document.getElementById('createuser').onclick = function()
{
    
}


function createlot() {
    const lotName = document.getElementById('newlot').value;
  
    if (!lotName) {
      alert('กรุณาใส่ชื่่อล็อต');
      return;
    }
  
    const dataToSend = {
      name: lotName // Assuming you want to send the input value as the 'date'
    };
  
    fetch('http://127.0.0.1:5000/api/lots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+window.localStorage.getItem("Token")
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.rowcount > 0) {
        alert('Lot created successfully!');
        document.getElementById('newlot').value = ''; // Clear the input field
      } else {
        alert('Failed to create lot.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the lot.');
    });
  }