document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const inputs = form.querySelectorAll("input, select, textarea");
  const submitBtn = form.querySelector("button[type='submit']");
  const messageBox = document.getElementById("formMessage");

  // Disable submit button initially
  submitBtn.disabled = true;

  // Check form completion
  function checkForm() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim() || input.value === "Select a subject") {
        allFilled = false;
      }
    });
    submitBtn.disabled = !allFilled;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkForm);
    input.addEventListener("change", checkForm);
  });

  // Show Bootstrap alert
  function showMessage(type, text) {
    messageBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (submitBtn.disabled) {
      showMessage("danger", "⚠️ Please fill all required fields before sending.");
      return;
    }

    showMessage("success", "✅ Thank you! Your message has been sent successfully.");
    form.reset();
    submitBtn.disabled = true;

    // Auto-hide after 5s
    setTimeout(() => {
      messageBox.innerHTML = "";
    }, 5000);
  });
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