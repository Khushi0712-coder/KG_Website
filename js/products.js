// Product Filtering & Sorting
document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const productGrid = document.getElementById("productGrid");
  const products = Array.from(productGrid.getElementsByClassName("product-card"));

  // 🟡 Filter Products
  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    products.forEach(product => {
      const category = product.getAttribute("data-category");
      if (selected === "all" || category === selected) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });

  // 🟡 Sort Products
  sortFilter.addEventListener("change", () => {
    const selected = sortFilter.value;
    let sortedProducts = [...products];

    if (selected === "name") {
      sortedProducts.sort((a, b) =>
        a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"))
      );
    } else if (selected === "low-high") {
      sortedProducts.sort((a, b) =>
        parseInt(a.getAttribute("data-price")) - parseInt(b.getAttribute("data-price"))
      );
    } else if (selected === "high-low") {
      sortedProducts.sort((a, b) =>
        parseInt(b.getAttribute("data-price")) - parseInt(a.getAttribute("data-price"))
      );
    }

    // Clear & re-append
    productGrid.innerHTML = "";
    sortedProducts.forEach(product => productGrid.appendChild(product));
  });

  // 🟡 Cart Functionality
  let cartCount = 0;
  const cartCountElement = document.getElementById("cart-count");

  // Create Toast Container (once only)
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  document.body.appendChild(toastContainer);

  // Function to show toast notification
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Handle Add to Cart button click
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!btn.classList.contains("added")) {
        // Add to cart
        btn.classList.add("added");
        btn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Added`;
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-success");

        cartCount++;
        cartCountElement.textContent = cartCount;

        showToast("Product added to cart ✅", "success");
      } else {
        // Remove from cart
        btn.classList.remove("added");
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping me-2"></i> Add to Cart`;
        btn.classList.remove("btn-success");
        btn.classList.add("btn-warning");

        cartCount = Math.max(0, cartCount - 1);
        cartCountElement.textContent = cartCount;

        showToast("Product removed from cart ❌", "error");
      }
    });
  });
});


// 🟡 Newsletter Section
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
