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
        item.qty = item.qty || 1;
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "col-12 d-flex justify-content-center mb-3";

        div.innerHTML = `
          <div class="d-flex align-items-center border rounded p-3 shadow-sm" style="max-width:600px; width:100%;">
            
            <!-- Product Image -->
            <div class="me-3" style="width:80px; height:80px; flex-shrink:0;">
              <img src="${item.image}" class="img-fluid rounded" style="object-fit:cover; width:100%; height:100%;" alt="${item.name}">
            </div>

            <!-- Product Info -->
            <div class="flex-grow-1">
              <h5 class="fw-bold mb-1">${item.name}</h5>
              <p class="text-muted mb-1">₹${item.price}</p>
            </div>

            <!-- Actions -->
            <div class="d-flex flex-column align-items-center">
  <!-- Remove Button -->
  <button class="btn btn-link p-0 remove-btn mb-3" data-index="${index}" title="Remove item" style=" color:red;">
    Remove
  </button>

  <!-- Quantity Controls -->
  <div class="d-flex align-items-center">
    <span class="fw-bold me-2">QTY</span>
    <button class="btn btn-outline-secondary btn-sm qty-decrease me-2" data-index="${index}">-</button>
    <input type="text" class="form-control form-control-sm text-center qty-input" 
           style="width:50px;" value="${item.qty}" data-index="${index}" readonly>
    <button class="btn btn-outline-secondary btn-sm qty-increase ms-2" data-index="${index}">+</button>
  </div>
</div>


          </div>
        `;

        cartItemsContainer.appendChild(div);
      });
    }

    cartTotalElement.textContent = total;
    cartCountElement.textContent = cart.length;
  }

  // Remove item & qty controls
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn") || e.target.closest(".remove-btn")) {
      const btn = e.target.closest(".remove-btn");
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("qty-increase")) {
      cart[index].qty = (cart[index].qty || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    } else if (e.target.classList.contains("qty-decrease")) {
      cart[index].qty = Math.max(1, (cart[index].qty || 1) - 1);
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




