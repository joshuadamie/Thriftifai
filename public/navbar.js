function updateNavbar() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  const cartCountHTML = `<span style="cursor:pointer;" onclick="window.location.href='cart.html'">
    🛒<span class="cart-count">${count}</span>
  </span>`;

  if (user) {
    navRight.innerHTML = `
      <button id="logout-btn">Logout</button>
      ${cartCountHTML}
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("userEmail");
      window.location.href = "index.html";
    });
  } else {
    navRight.innerHTML = `
      <button onclick="window.location.href='signin.html'">Sign In</button>
      ${cartCountHTML}
    `;
  }
}
