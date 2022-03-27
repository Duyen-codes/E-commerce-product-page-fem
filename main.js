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

// Slider
const slides = document.querySelectorAll(".slide");

const iconNext = document.querySelector(".icon-next");
const iconPrevious = document.querySelector(".icon-previous");

const slider = document.querySelector(".slider");

// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${100 * index}%)`;
// });

const activateThumbnailImg = function (slide) {
  document
    .querySelectorAll(".thumbnail-img")
    .forEach((img) => img.classList.remove("thumbnail-img-active"));

  document
    .querySelector(`.thumbnail-img[data-slide="${slide}"]`)
    .classList.add("thumbnail-img-active");
};

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
  activateThumbnailImg(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateThumbnailImg(currentSlide);
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

const thumbnailContainer = document.querySelector(".thumbnail-container");

thumbnailContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("thumbnail-img")) {
    // const slide = e.target.dataset.slide;
    // destructuring
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateThumbnailImg(slide);
  }
});

// purchase function

const iconPlus = document.querySelector(".icon-plus");
const iconMinus = document.querySelector(".icon-minus");
const quantity = document.querySelector(".quantity");
const addToCartButton = document.querySelector(".add-to-cart-btn");
const toolTipText = document.querySelector(".tooltiptext");

let counter = 0;

function decrement() {
  if (counter <= 0) return;
  counter--;
  quantity.textContent = counter;
  toolTipText.textContent = counter;
}

function increment() {
  counter++;
  quantity.textContent = counter;
  toolTipText.textContent = counter;
}

function addToCart() {
  console.log("add to cart");
}

// Toggle checkout card
const cartContent = document.querySelector(".cart-content");

iconCart.addEventListener("click", () => {
  checkoutCard.classList.toggle("open");
  if (toolTipText.textContent == "0") {
    cartContent.textContent = "Your cart is empty";
    cartContent.style.textAlign = "center";
  }
});

iconMinus.addEventListener("click", decrement);
iconPlus.addEventListener("click", increment);
addToCartButton.addEventListener("click", addToCart);
