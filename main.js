// Queries

const iconMenu = document.querySelector(".icon-menu");
const nav = document.querySelector("nav");
const iconClose = document.querySelector(".icon-close");
const iconCart = document.querySelector(".icon-cart");
const checkoutCard = document.querySelector(".checkout-card");

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

// Slider
const slides = document.querySelectorAll(".slide");

const iconNext = document.querySelector(".icon-next");
const iconPrevious = document.querySelector(".icon-previous");

const slider = document.querySelector(".slider");

// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${100 * index}%)`;
// });

let currentSlide = 0;
let maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((sl, index) => {
    sl.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

goToSlide(0);

// Next slide
const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

iconNext.addEventListener("click", nextSlide);
iconPrevious.addEventListener("click", prevSlide);

// currentSlide = 1: -100%, 0%, 100%, 200%

// Slide images on pressing arrow keys on keyboard
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }

  e.key === "ArrowRight" && nextSlide();
});
