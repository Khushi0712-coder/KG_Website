// common.js
document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
  }
});
