const iconMenu = document.querySelector(".icon-menu");

const nav = document.querySelector("nav");

const iconClose = document.querySelector(".icon-close");
console.log(iconMenu, nav);

// Toggle mobile nav

iconMenu.addEventListener("click", () => {
  nav.classList.toggle("open");
});

iconClose.addEventListener("click", () => {
  nav.classList.remove("open");
});
