// 4. Updated script.js (public/script.js mein replace kar do)
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const API_BASE = window.location.origin;   // same server pe chalega

    const cartToggle = document.getElementById('cart-toggle');
    const miniCart = document.getElementById('mini-cart');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');

    async function updateCartCount() {
        const res = await fetch(`${API_BASE}/api/cart`);
        const data = await res.json();
        cart = data;
        cartCount.textContent = cart.length;
        renderCart();
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
        await fetch(`\( {API_BASE}/api/cart/remove/ \){id}`, { method: 'DELETE' });
        updateCartCount();
    };

    // Add to cart (backend call)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.closest('.product-card').dataset.id || e.target.dataset.productId;
            await fetch(`${API_BASE}/api/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            updateCartCount();
            miniCart.classList.add('open');
        });
    });

    // Product cards mein id daal do (index.html mein thodi change)
    // Har product-card mein <div class="product-card" data-id="1"> ... 

    // Cart toggle
    if (cartToggle) cartToggle.addEventListener('click', () => miniCart.classList.toggle('open'));
    if (closeCart) closeCart.addEventListener('click', () => miniCart.classList.remove('open'));

    // Auth forms (login & signup)
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            const isLogin = form.closest('.auth-card').querySelector('h2').textContent.includes('Login');

            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const res = await fetch(API_BASE + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.success) {
                alert(data.message || 'Login successful!');
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            }
        });
    });

    // Initial load
    updateCartCount();

    // Smooth scroll same rahega
});
