// Queries

const iconMenu = document.querySelector(".icon-menu");
const nav = document.querySelector("nav");
const iconClose = document.querySelector(".icon-close");
const iconCart = document.querySelector(".icon-cart");
const checkoutCard = document.querySelector(".checkout-card");
console.log(checkoutCard);

// Toggle mobile nav

iconMenu.addEventListener("click", () => {
  nav.classList.toggle("open");
});

iconClose.addEventListener("click", () => {
  nav.classList.remove("open");
});

// Toggle checkout card
iconCart.addEventListener("click", () => {
  checkoutCard.classList.toggle("open");
});
