// Queries
const iconMenu = document.querySelector(".icon-menu");
const nav = document.querySelector("nav");
const iconClose = document.querySelector(".icon-close");
const iconCart = document.querySelector(".icon-cart");
const checkoutCard = document.querySelector(".checkout-card");
const navLinks = document.querySelector(".nav-links").querySelectorAll("a");

// changing preview
const thumbnailImages = document.querySelectorAll(".thumbnail-img");
const bigImg = document.getElementById("bigImg");
const next = document.querySelector(".icon-next");
const previous = document.querySelector(".icon-previous");

//modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const bigImgModal = document.getElementById("bigImgModal");

const modalNextBtn = document.querySelector(".modal-next");
const modalPreviousBtn = document.querySelector(".modal-previous");
const modalThumbnails = document.querySelectorAll(".modal__thumbnails__small");

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

// MODAL
// opening and closing modal
bigImg.addEventListener("click", (e) => {
  //do not show modal on mobile
  if (window.screen.width < 900) {
    return;
  }
  modal.style.display = "flex";
  bigImgModal.src = e.target.src;
  // this was setting the slideIndex always to 1
  // slideIndex = bigImgModal.dataset.indexNumber;

  let slideIndex =
    document.querySelector(".selected").firstElementChild.dataset.slide;
  console.log("slideIndex", slideIndex);
  modalThumbnails.forEach((pic) => {
    if (pic.querySelector("img").dataset.indexNumber === slideIndex) {
      pic.classList.add("selected");
    } else {
      pic.classList.remove("selected");
    }
  });
});

window.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    modal.style.display = "none";
  }
});

closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

// CHANGING PREVIEW

// on big screen
thumbnailImages.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    bigImg.src = `images/image-product-${
      e.target.querySelector("img").dataset.slide
    }.jpg`;
    thumbnailImages.forEach((pic) => {
      pic.classList.remove("selected");
    });
    e.target.classList.add("selected");
  });
});

// Changing preview on small screen
let slideIndex = 1;

function nextImage(imageToChange) {
  slideIndex++;
  if (slideIndex > thumbnailImages.length) {
    slideIndex = 1;
  }
  imageToChange.src = `images/image-product-${slideIndex}.jpg`;
  modalThumbnails.forEach((pic) => {
    if (pic.querySelector("img").dataset.indexNumber == slideIndex) {
      pic.classList.add("selected");
    } else {
      pic.classList.remove("selected");
    }
  });
}

function previousImage(imageToChange) {
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = thumbnailImages.length;
  }
  imageToChange.src = `images/image-product-${slideIndex}.jpg`;
  modalThumbnails.forEach((pic) => {
    if (pic.querySelector("img").dataset.indexNumber == slideIndex) {
      pic.classList.add("selected");
    } else {
      pic.classList.remove("selected");
    }
  });
}

next.addEventListener("click", () => {
  nextImage(bigImg);
});

previous.addEventListener("click", () => {
  previousImage(bigImg);
});

// image modal lightbox

// switching picture by clicking thumbnails
modalThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    bigImgModal.src = `images/image-product-${
      e.target.querySelector("img").dataset.indexNumber
    }.jpg`;
    slideIndex = e.target.querySelector("img").dataset.indexNumber;
    modalThumbnails.forEach((pic) => {
      pic.classList.remove("selected");
    });
    thumbnail.classList.add("selected");
  });
});

// switching the modal picture by next, previous buttons

modalNextBtn.addEventListener("click", () => {
  nextImage(bigImgModal);
});

modalPreviousBtn.addEventListener("click", () => {
  previousImage(bigImgModal);
});
