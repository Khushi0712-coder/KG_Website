// document.addEventListener("DOMContentLoaded", () => {
//     const buttons = document.querySelectorAll(".add-to-cart");

//     buttons.forEach(btn => {
//       btn.addEventListener("click", () => {
//         btn.classList.add("clicked");
//         btn.innerHTML = '<i class="bi bi-check-lg"></i> Added';
//       });
//     });
//   });





// function showToast(message) {
//     const toast = document.getElementById("toast");
//     toast.textContent = message;
//     toast.classList.add("show");

//     // Hide after 3 sec
//     setTimeout(() => {
//       toast.classList.remove("show");
//     }, 3000);
//   }

//   document.querySelectorAll(".add-to-cart").forEach(button => {
//     button.addEventListener("click", function () {
//       const name = this.getAttribute("data-name");
//       const price = this.getAttribute("data-price");

//       // Get existing cart
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];

//       // Add new product
//       cart.push({ name, price });
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Change button
//       this.textContent = "Added ✅";
//       this.classList.remove("btn-warning");
//       this.classList.add("btn-success");
//       this.disabled = true;

//       // Show success toast
//       showToast(name + " added to cart successfully!");
//     });
//   });



document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault(); // Prevent default submit

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const sendBtn = document.getElementById("sendBtn");

  if(!name || !email){
    alert("⚠️ Please enter your Name and Email.");
    return;
  }

  // Button processing state
  sendBtn.innerHTML = "Sending...";
  sendBtn.disabled = true;

  // Simulate sending delay
  setTimeout(() => {
    sendBtn.innerHTML = '<i class="bi bi-send-fill"></i> SEND MESSAGE';
    sendBtn.disabled = false;
    document.getElementById("contactForm").reset();

    // Show toast
    const toast = document.getElementById("formToast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }, 2000);
});





// newsletter section

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