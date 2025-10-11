// === cart.js ===

// Safely load cart from localStorage
let cart;
try {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  cart = Array.isArray(savedCart) ? savedCart : [];
} catch (err) {
  cart = [];
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
function addToCart(item) {
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  alert(`${item.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  saveCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
}

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.textContent = `(${count})`;
  }
}

// Ensure count loads correctly after DOM ready
document.addEventListener("DOMContentLoaded", updateCartCount);
