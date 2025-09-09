document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const productGrid = document.getElementById("productGrid");
  const products = Array.from(productGrid.getElementsByClassName("product-card"));
  const cartCountElement = document.getElementById("cart-count");

  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCountElement.textContent = cart.length;

  // 🟡 Filter Products
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      const selected = categoryFilter.value;
      products.forEach(product => {
        const category = product.getAttribute("data-category");
        product.style.display = (selected === "all" || category === selected) ? "block" : "none";
      });
    });
  }

  // 🟡 Sort Products
  if (sortFilter) {
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

      productGrid.innerHTML = "";
      sortedProducts.forEach(p => productGrid.appendChild(p));
    });
  }

  // 🟡 Add to Cart
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCountElement.textContent = cart.length;
  }

  products.forEach((product) => {
    const addBtn = product.querySelector(".add-to-cart-btn");
    const productData = {
      name: product.getAttribute("data-name"),
      price: parseInt(product.getAttribute("data-price")),
      category: product.getAttribute("data-category"),
      image: product.querySelector("img").src
    };

    // Set initial button state if already in cart
    if (cart.find(item => item.name === productData.name)) {
      addBtn.classList.add("added", "btn-success");
      addBtn.classList.remove("btn-warning");
      addBtn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Added`;
    }

    addBtn.addEventListener("click", () => {
      const index = cart.findIndex(item => item.name === productData.name);
      if (index === -1) {
        cart.push(productData);
        addBtn.classList.add("added", "btn-success");
        addBtn.classList.remove("btn-warning");
        addBtn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Added`;
      } else {
        cart.splice(index, 1);
        addBtn.classList.remove("added", "btn-success");
        addBtn.classList.add("btn-warning");
        addBtn.innerHTML = `<i class="fa-solid fa-cart-shopping me-2"></i> Add to Cart`;
      }
      saveCart();
    });
  });

  // 🟡 Newsletter
  const btn = document.getElementById("newsletterBtn");
  const emailInput = document.getElementById("newsletterEmail");
  const toast = document.getElementById("newsletterToast");
  if (btn && emailInput && toast) {
    const closeBtn = toast.querySelector(".close-btn");

    btn.addEventListener("click", function () {
      const email = emailInput.value.trim();
      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address with '@'");
        return;
      }
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        emailInput.value = "";
      }, 2000);
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => toast.classList.remove("show"));
    }
  }
});
