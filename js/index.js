function mobileMenu() {
  if (window.innerWidth < 992) {
    document.querySelector(".mobile-nav-list").style.display = "flex";
    document.querySelector(".mobile-footer-list").style.display = "block";
    document.querySelector(".nav-list").style.display = "none";
    document.querySelector(".footer-list").style.display = "none";
  } else {
    document.querySelector(".mobile-nav-list").style.display = "none";
    document.querySelector(".nav-list").style.display = "flex";
    document.querySelector(".footer-list").style.display = "flex";
    document.querySelector(".mobile-footer-list").style.display = "none";
  }
}
const carouselInner = document.querySelector('.carousel-inner')
let originalMarkup = carouselInner.innerHTML;

const flowers = [
  { src: "../images/flowers/flower1.jpg", alt: "famous1", text: "Букет 1", price: "5500.00 ₽"},
  { src: "../images/flowers/flower2.jpg", alt: "famous2", text: "Букет 2", price: "6000.00 ₽"},
  { src: "../images/flowers/flower3.jpg", alt: "famous3", text: "Букет 3", price: "4200.00 ₽"},
  { src: "../images/flowers/flower4.jpg", alt: "famous1", text: "Букет 4", price: "3900.00 ₽"},
  { src: "../images/flowers/flower5.jpg", alt: "famous2", text: "Букет 5", price: "5000.00 ₽"},
  { src: "../images/flowers/flower6.jpg", alt: "famous3", text: "Букет 6", price: "4500.00 ₽"}
];

function generateCarouselItem(flower, isActive) {
  return `
    <div class="carousel-item ${isActive ? 'active' : ''}">
      <div class="d-flex row">
        <div class="carousel-item-card col-10">
          <img src="${flower.src}" class="d-block item-img w-100" alt="${flower.alt}" />
          <p class="text m-0">${flower.text}</p>
          <p class="price m-0">${flower.price}</p>
          <button class="button basket-normal col-8 d-block mt-3">в корзину</button>
        </div>
      </div>
    </div>`;
}

function mobileFamous() {
  carouselInner.innerHTML = '';

  if (window.innerWidth < 576) {
    flowers.forEach((flower, index) => {
      carouselInner.insertAdjacentHTML("beforeend", generateCarouselItem(flower, index === 0));
    });
  } else if (window.innerWidth < 768) {
    for (let i = 0; i < flowers.length; i += 2) {
      const isActive = i === 0;
      const items = flowers.slice(i, i + 2).map(flower => `
        <div class="carousel-item-card col-5">
          <img src="${flower.src}" class="d-block item-img w-100" alt="${flower.alt}" />
          <p class="text m-0">${flower.text}</p>
          <p class="price m-0">${flower.price}</p>
          <button class="button basket-normal col-8 d-block">в корзину</button>
        </div>
      `).join('');

      carouselInner.insertAdjacentHTML("beforeend", `
        <div class="carousel-item ${isActive ? 'active' : ''}">
          <div class="d-flex row">
            ${items}
          </div>
        </div>
      `);
    }
  } else {
    carouselInner.innerHTML = originalMarkup;
  }
}

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener('load', mobileFamous);
window.addEventListener('resize', debounce(mobileFamous));

window.addEventListener("load", mobileMenu);
window.addEventListener("resize", debounce(mobileMenu));
