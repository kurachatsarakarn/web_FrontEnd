document.addEventListener('DOMContentLoaded', function() {
  const createUserButton = document.getElementById('createuser');
  if (createUserButton) {
    createUserButton.onclick = function() {
      const dataToSend = {
        name: document.getElementById('username').value,
        password: document.getElementById('password').value,
        Role: document.getElementById('Role').value
      };
      fetch('http://127.0.0.1:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + window.localStorage.getItem("Token")
        },
        body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
        if (data.rowcount > 0) {
          alert('User created successfully!');
          window.open('userall.html', '_self');
        } else {
          alert('Failed to create user.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the user.');
      });
    };
  } else {
    console.error('Element with id "createuser" not found');
  }
});
