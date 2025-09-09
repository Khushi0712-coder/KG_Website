document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartCountElement = document.getElementById("cart-count");
  const cartTotalElement = document.getElementById("cartTotal");
  const cartSummary = document.getElementById("cartSummary");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCountElement.textContent = cart.length;

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartSummary.classList.add("d-none");

      // ✅ Empty cart section as box/card
      cartItemsContainer.innerHTML = `
        <div class="col-12 d-flex justify-content-center">
          <div class="card shadow-sm p-5 text-center" style="max-width: 500px; width: 100%;">
            <div class="cart-icon mb-4">
              <i class="bi bi-cart-x-fill" style="font-size:4rem;color:#ffc107;"></i>
            </div>
            <h2 class="fw-bold mb-3">Your cart is empty</h2>
            <p class="text-muted mb-4">Add some delicious saffron products to get started!</p>
            <a href="products.html" class="btn btn-warning btn-lg fw-bold shadow-sm">
              <i class="bi bi-bag-fill me-2"></i> Start Shopping
            </a>
          </div>
        </div>
      `;
    } else {
      cartSummary.classList.remove("d-none");

      cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.className = "col-12 col-md-6 col-lg-4";
        div.innerHTML = `
          <div class="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between">
            <img src="${item.image}" class="card-img-top mb-2" alt="${item.name}">
            <h5 class="fw-bold">${item.name}</h5>
            <p class="text-muted">₹${item.price}</p>
            <button class="btn btn-danger remove-btn" data-index="${index}">
              <i class="fa-solid fa-trash me-2"></i> Remove
            </button>
          </div>
        `;
        cartItemsContainer.appendChild(div);
      });
    }

    cartTotalElement.textContent = total;
    cartCountElement.textContent = cart.length;
  }

  // 🗑 Remove item
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn") || e.target.closest(".remove-btn")) {
      const btn = e.target.closest(".remove-btn");
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  renderCart();
});


// 🟡 Newsletter section
const btn = document.getElementById("newsletterBtn");
const emailInput = document.getElementById("newsletterEmail");
const toast = document.getElementById("newsletterToast");
const closeBtn = toast.querySelector(".close-btn");

btn.addEventListener("click", function () {
  const email = emailInput.value.trim();

  // Validation
  if (email === "" || !email.includes("@")) {
    alert("Please enter a valid email address with '@'");
    return;
  }

  // Show toast
  toast.classList.add("show");

  // Auto-hide after 2s and clear input
  setTimeout(() => {
    toast.classList.remove("show");
    emailInput.value = "";
  }, 2000);
});

// Close manually
closeBtn.addEventListener("click", () => {
  toast.classList.remove("show");
});
