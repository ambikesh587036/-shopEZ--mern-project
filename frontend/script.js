// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartToggle = document.getElementById('cart-toggle');
    const miniCart = document.getElementById('mini-cart');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.querySelector('.cart-count');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function renderCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item}</span>
                <button onclick="removeFromCart('${item}')">Remove</button>
            </div>
        `).join('');
    }

    function addToCart(productName) {
        cart.push(productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    window.removeFromCart = function(productName) {
        cart = cart.filter(item => item !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    // Event listeners
    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            miniCart.classList.toggle('open');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            miniCart.classList.remove('open');
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            addToCart(e.target.dataset.product);
        });
    });

    updateCartCount();
    if (miniCart) renderCart();

    // Quick View Modal (placeholder)
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModal = document.getElementById('close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            quickViewModal.style.display = 'none';
        });
    }

    window.onclick = function(event) {
        if (event.target === quickViewModal) {
            quickViewModal.style.display = 'none';
        }
    }

    // For product cards, add quick view on click (optional)
    // document.querySelectorAll('.product-card').forEach(card => {
    //     card.addEventListener('click', () => {
    //         // Populate modal and show
    //         quickViewModal.style.display = 'block';
    //     });
    // });

    // Auth form submissions (placeholder)
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! (Demo)');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Entrance animations (simple CSS-based, since no Framer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .hero').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});