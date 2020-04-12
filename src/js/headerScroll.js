const headerScrollEl = document.querySelector(".header__scroll-arrow");
const aboutEl = document.querySelector(".about");
headerScrollEl.addEventListener("click", () => {
  const interval = setInterval(() => {
    const aboutCoords = aboutEl.getBoundingClientRect();
    if (aboutCoords.top < 60) {
      clearInterval(interval);
      return;
    }
    window.scrollTo(0, window.pageYOffset + 5);
  }, 0.1);
});