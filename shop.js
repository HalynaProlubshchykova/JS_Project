let cart = {}; // Корзина

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  checkCart();
});

function loadProducts() {
  // Завантажуємо товари на сторінку
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      let out = "";
      for (let key in data) {
        out += '<div class="products_item">';
        out += `<h2>${data[key]["title"]}</h2>`;
        out += `<h3>Price: ${data[key]["price"]}</h3>`;
        out += `<p>${data[key]["description"]}</p>`;
        out += `<img src="${data[key].image}">`;
        out += `<button class="add" data-art="${key}">Buy</button>`;
        out += "</div>";
      }
      document.getElementById("products").innerHTML = out;

      // Додаємо обробник подій для кнопок "Buy"
      document.querySelectorAll("button.add").forEach((button) => {
        button.addEventListener("click", addToCart);
      });
    });
}

function addToCart() {
  // Додаємо товар у корзину
  const articul = this.getAttribute("data-art");
  cart[articul] = (cart[articul] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkCart() {
  // Перевіряємо, чи є корзина в localStorage
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
  }
}
