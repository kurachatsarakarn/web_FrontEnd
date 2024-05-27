Token = window.localStorage.getItem("Token");
Role = window.localStorage.getItem("Role");
console.log("Role= " + Role);
console.log("Token=" + Token);
if (!Role) {
  window.open("login.html", "_self");
  console.log("ssss");
}

function logout(){
  window.localStorage.clear();
  window.open("login.html","_self");
}