// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
            displayCart();
        });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return; // Skip if not on products page

    const lang = document.documentElement.lang;
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item[`name_${lang}`]}</span>
            <span>${item.price} €</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    cartTotal.textContent = `${total} €`;
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    const clearButton = document.getElementById('clear-cart');
    if (clearButton) {
        clearButton.addEventListener('click', clearCart);
    }
});