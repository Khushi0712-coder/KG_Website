// Rating selection
const stars = document.querySelectorAll(".rating-stars i");
const ratingInput = document.getElementById("rating");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    ratingInput.value = star.dataset.value;

    // Reset stars
    stars.forEach(s => s.classList.remove("active"));

    // Highlight selected stars
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }
  });
});

// Form submission
const reviewForm = document.getElementById("reviewForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation for rating
  if (!ratingInput.value) {
    alert("Please select a rating before submitting.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Review";

    // Reset form
    reviewForm.reset();
    ratingInput.value = "";
    stars.forEach(s => s.classList.remove("active"));

    // Show success message
    successMessage.style.display = "block";

    // Hide message after 3s
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }, 1500);
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
