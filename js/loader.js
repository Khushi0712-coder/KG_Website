window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // 1.5s animation + 0.7s visible = 2.2s total
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1100);
});
