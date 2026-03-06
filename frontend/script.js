let cart=[]

function addToCart(product){

cart.push(product)

let list=document.getElementById("cart-items")

let item=document.createElement("li")

item.innerText=product

list.appendChild(item)

alert(product+" added to cart")

}