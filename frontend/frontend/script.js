let cart = []

function addToCart(product, price){

cart.push({product, price})

alert(product + " added to cart")

updateCart()

}

function updateCart(){

let cartList = document.getElementById("cart-items")

let totalPrice = document.getElementById("total")

cartList.innerHTML = ""

let total = 0

cart.forEach(item => {

let li = document.createElement("li")

li.innerText = item.product + " - ₹" + item.price

cartList.appendChild(li)

total += item.price

})

totalPrice.innerText = "Total: ₹" + total

  }
