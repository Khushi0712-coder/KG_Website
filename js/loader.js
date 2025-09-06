window.addEventListener("load", function() {
      const loader = document.getElementById("loader");
      const content = document.getElementById("content");

      setTimeout(() => {
        loader.classList.add("hidden");
        content.style.display = "block";
        document.body.style.overflow = "auto"; // scroll enable after loader
      }, 2000); // loader 2s ke liye dikhega
    });