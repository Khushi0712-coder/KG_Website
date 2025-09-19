let currentStep = 0;
const steps = document.querySelectorAll('.steps span');
const contents = document.querySelectorAll('.step-content');
const modal = document.getElementById("checkoutModal");
const leftPanel = document.getElementById("leftPanel");
const detailModal = document.getElementById("detailModal");

// Attach click handler to an order-box to open detail modal
function attachOrderBoxHandler(box){
  box.addEventListener("click", () => {
    const details = box.dataset.details; // details stored in data attribute
    const title = box.querySelector("h3").childNodes[0].nodeValue.trim();

    document.getElementById("detailTitle").textContent = title;

    // Build form in detail modal
    const lines = details ? details.split("<br>") : [];
    let formHtml = "";
    lines.forEach(line => {
      const [label, value] = line.split(":");
      if(value){
        formHtml += `<div style="display:flex; flex-direction:column; margin-bottom:5px;">
          <label>${label.trim()}</label>
          <input type="text" value="${value.trim()}" readonly />
        </div>`;
      }
    });
    document.getElementById("detailForm").innerHTML = formHtml;

    detailModal.style.display = "block";
  });
}

// Attach handlers to existing order-boxes
document.querySelectorAll(".order-box").forEach(box => attachOrderBoxHandler(box));

// Open modal on any Buy Now button click
document.querySelectorAll('.buy-now-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productCard = btn.closest('.product-card');
    const name = productCard.getAttribute('data-name');
    const price = productCard.getAttribute('data-price');
    const category = productCard.getAttribute('data-category');

    // Update main order summary box: store details in data attribute only
    const orderBox = document.getElementById("mainOrderBox");
    orderBox.dataset.details = `Product: ${name}<br>Category: ${category}<br>Price: ₹${price}`;

    modal.style.display = "block";

    // Reset steps
    contents.forEach(c => c.classList.remove('active'));
    steps.forEach(s => s.classList.remove('active'));
    currentStep = 0;
    contents[0].classList.add('active');
    steps[0].classList.add('active');
  });
});

// Close checkout modal
document.getElementById("closeModal").addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

// Step navigation
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    if(index <= currentStep){
      contents[currentStep].classList.remove('active');
      steps[currentStep].classList.remove('active');
      currentStep = index;
      contents[currentStep].classList.add('active');
      steps[currentStep].classList.add('active');
    }
  });
});

function nextStep(){
  const form = contents[currentStep].querySelector("form");
  if(form && !form.checkValidity()){ form.reportValidity(); return; }
  if(currentStep < steps.length - 1){
    if(currentStep===0) saveContactInfo();
    if(currentStep===1) saveAddressInfo();
    contents[currentStep].classList.remove('active');
    steps[currentStep].classList.remove('active');
    currentStep++;
    contents[currentStep].classList.add('active');
    steps[currentStep].classList.add('active');
  }
}

function prevStep(){
  if(currentStep > 0){
    contents[currentStep].classList.remove('active');
    steps[currentStep].classList.remove('active');
    currentStep--;
    contents[currentStep].classList.add('active');
    steps[currentStep].classList.add('active');
  }
}

// Detail modal close
document.getElementById("closeDetail").addEventListener("click", () => { detailModal.style.display="none"; });
window.addEventListener("click", e => { if(e.target === detailModal) detailModal.style.display="none"; });

// Save Contact Info (details only in data attribute, not visible in left panel)
function saveContactInfo(){
  const code = document.getElementById("countryCode").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  let box = document.getElementById("contactBox");
  if(!box){
    box = document.createElement("div");
    box.className = "order-box"; 
    box.id="contactBox"; 
    box.innerHTML = `<h3>Contact Info <span>+</span></h3>`;
    leftPanel.insertBefore(box,leftPanel.querySelector(".secure"));
    attachOrderBoxHandler(box);
  }
  box.dataset.details = `Phone: ${code} ${mobile}<br>Email: ${email}`;
}

// Save Address Info (details only in data attribute)
function saveAddressInfo(){
  const fullname = document.getElementById("fullname").value;
  const house = document.getElementById("house").value;
  const area = document.getElementById("area").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pincode = document.getElementById("pincode").value;
  const saveAsCheck = document.getElementById("saveAsCheck").checked;

  let box = document.getElementById("addressBox");
  let saveLabel = saveAsCheck ? `Saved as:` : "";
  if(!box){
    box = document.createElement("div");
    box.className="order-box"; 
    box.id="addressBox"; 
    box.innerHTML=`<h3>Address <span>+</span></h3>`;
    leftPanel.insertBefore(box,leftPanel.querySelector(".secure"));
    attachOrderBoxHandler(box);
  }
  box.dataset.details = `Name: ${fullname}<br>House: ${house}<br>Area: ${area}<br>City: ${city}<br>State: ${state}<br>Pincode: ${pincode}<br>${saveLabel}`;
}

// Payment Fields
function showPaymentFields(){
  const method = document.getElementById("paymentMethod").value;
  document.querySelectorAll(".payment-fields").forEach(f => f.style.display="none");
  if(method==="card") document.getElementById("cardFields").style.display="flex";
  if(method==="upi") document.getElementById("upiFields").style.display="flex";
  if(method==="cod") document.getElementById("codFields").style.display="flex";
}






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


