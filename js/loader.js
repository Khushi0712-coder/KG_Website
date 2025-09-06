window.addEventListener("load", function() {
      const loader = document.getElementById("loader");
      const content = document.getElementById("content");

      setTimeout(() => {
        loader.classList.add("hidden");
        content.style.display = "block";
      }, 1100); // loader 1.1s ke liye dikhega
    });