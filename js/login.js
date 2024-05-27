function login() {
    const dataToSend = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user);
        window.localStorage.setItem("Token",data.Token);
        window.localStorage.setItem("Role",data.Role);
        window.open("index.html","_self");
      })
      .catch((error) => {
        console.error(error);
      });
  }