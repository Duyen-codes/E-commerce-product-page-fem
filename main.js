// Queries

const iconMenu = document.querySelector(".icon-menu");
const nav = document.querySelector("nav");
const iconClose = document.querySelector(".icon-close");
const iconCart = document.querySelector(".icon-cart");
const checkoutCard = document.querySelector(".checkout-card");

const navLinks = document.querySelector(".nav-links").querySelectorAll("a");

// Close nav mobile when a navlink clicks
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

// Toggle mobile nav

iconMenu.addEventListener("click", () => {
  nav.classList.toggle("open");
});

iconClose.addEventListener("click", () => {
  nav.classList.remove("open");
});

// Slider
const slides = document.querySelectorAll(".outer-container .slide");

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
}

function increment() {
  counter++;
  quantity.textContent = counter;
}

function addToCart() {
  console.log("add to cart");
  toolTipText.textContent = counter;
  toolTipText.style.display = "block";
}

// Toggle checkout card
const cartContent = document.querySelector(".cart-content");

window.addEventListener("load", function () {
  if (toolTipText.textContent == "0") {
    toolTipText.style.display = "none";
  }
});

iconCart.addEventListener("click", () => {
  if (checkoutCard.classList.contains("open")) {
    checkoutCard.classList.remove("open");
  } else {
    checkoutCard.classList.add("open");
  }
  if (toolTipText.textContent == "0") {
    cartContent.textContent = "Your cart is empty";
    cartContent.style.textAlign = "center";
  } else {
    renderCheckout();
  }
});

// Render checkout
function renderCheckout() {
  cartContent.innerHTML = "";
  cartContent.innerHTML += `
  <div class="purchase-details">
  <img
    class="product-img"
    src="./images/image-product-1-thumbnail.jpg"
    alt=""
  />
  <div>
    <div>Autumn Limited Edition...</div>
    <span>$125.00</span> x <span class="quantity">${counter} </span>
    <span class="total-price">$${counter * 125.0}</span>
  </div>
  <img class="icon-delete" src="./images/icon-delete.svg" alt="icon-delete" />
</div>

<button class="checkout-btn">Checkout</button>
`;
  checkoutCard.appendChild(cartContent);
  const iconDelete = document.querySelector(".icon-delete");
  iconDelete.addEventListener("click", deleteItem);
}

iconMinus.addEventListener("click", decrement);
iconPlus.addEventListener("click", increment);
addToCartButton.addEventListener("click", addToCart);

// Delete cart item
function deleteItem() {
  cartContent.textContent = "Your cart is empty";
  cartContent.style.textAlign = "center";
  toolTipText.style.display = "none";
}

// image modal lightbox

let modalSlideIndex = 0;

// click listener for the images in the slider to open the modal and show the image according to its index
console.log(slides);
slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    modalSlideIndex = index;
    openLightbox();
    showModalSlide(modalSlideIndex);
  });
});

// click listener for modal img thumnail to display the image in the main container
document.querySelectorAll(".modal .thumbnail-img").forEach((img, index) => {
  img.addEventListener("click", () => {
    toModalSlide(index);
  });
});

// event listeners for close, next, previous buttons
document
  .querySelector(".modal .icon-close")
  .addEventListener("click", closeLightbox);
document
  .querySelector(".modal .icon-next")
  .addEventListener("click", () => changeModalSlide(1));
document
  .querySelector(".modal .icon-previous")
  .addEventListener("click", () => changeModalSlide(-1));

function openLightbox() {
  document.querySelector(".modal").style.display = "block";
}

function closeLightbox() {
  document.querySelector(".modal").style.display = "none";
}

function changeModalSlide(n) {
  showModalSlide((modalSlideIndex += n));
}

function toModalSlide(n) {
  showModalSlide((modalSlideIndex = n));
}

function showModalSlide(n) {
  const modalSlides = document.querySelectorAll(".modal img.slide");
  if (n == modalSlides.length) {
    modalSlideIndex = 0;
  }
  if (n < 0) {
    modalSlideIndex = modalSlides.length;
  }
  modalSlides.forEach((slide) => (slide.style.display = "none"));
  modalSlides[modalSlideIndex].style.display = "block";
}
