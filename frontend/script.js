document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const API_BASE = window.location.origin;   // same server pe chalega (development mein)

    // Production mein yeh change kar dena (Render URL)
    // const API_BASE = "https://your-backend-name.onrender.com";

    const cartToggle = document.getElementById('cart-toggle');
    const miniCart = document.getElementById('mini-cart');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');

    async function updateCartCount() {
        try {
            const res = await fetch(`${API_BASE}/api/cart`);
            if (!res.ok) throw new Error('Cart fetch failed');
            const data = await res.json();
            cart = data;
            cartCount.textContent = cart.length;
            renderCart();
        } catch (err) {
            console.error('Cart update error:', err);
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" width="50" style="border-radius:8px">
                <div>
                    <span>${item.name}</span><br>
                    <small>$${item.price}</small>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background:none;border:none;color:red;cursor:pointer">×</button>
            </div>
        `).join('');
    }

    window.removeFromCart = async function(id) {
        try {
            await fetch(`\( {API_BASE}/api/cart/remove/ \){id}`, { method: 'DELETE' });
            updateCartCount();
        } catch (err) {
            console.error('Remove from cart failed:', err);
        }
    };

    // Add to cart buttons (tumhare index.html mein data-id attribute daalna padega)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = btn.dataset.id;  // ya e.target.closest('.product-card').dataset.id
            if (!productId) return alert('Product ID missing');

            try {
                await fetch(`${API_BASE}/api/cart/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: productId })
                });
                updateCartCount();
                miniCart.classList.add('open');  // cart khol do add karne pe
            } catch (err) {
                console.error('Add to cart failed:', err);
            }
        });
    });

    // Cart toggle & close
    if (cartToggle) cartToggle.addEventListener('click', () => miniCart.classList.toggle('open'));
    if (closeCart) closeCart.addEventListener('click', () => miniCart.classList.remove('open'));

    // Pehli baar cart load karo
    updateCartCount();
});
