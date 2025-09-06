document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-item");

  accordions.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      accordions.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
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
