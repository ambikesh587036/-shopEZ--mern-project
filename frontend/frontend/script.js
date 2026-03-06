function signup(){

let name = document.getElementById("name").value
let email = document.getElementById("email").value
let password = document.getElementById("password").value

localStorage.setItem("user", JSON.stringify({name,email,password}))

alert("Signup successful")

window.location.href = "login.html"

}

function login(){

let email = document.getElementById("email").value
let password = document.getElementById("password").value

let user = JSON.parse(localStorage.getItem("user"))

if(user.email === email && user.password === password){

alert("Login successful")

window.location.href = "index.html"

}else{

alert("Invalid login")

}

}
