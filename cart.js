let cart = {}; // Корзина

// Отримання даних з JSON файлу (products.json)
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data;
    checkCart();
    showCart();

    function showCart() {
      const cartElement = document.getElementById("my_cart");
      const totalElement = document.getElementById("total_price");
      let totalPrice = 0;

      if (Object.keys(cart).length === 0) {
        cartElement.innerHTML = "Cart is empty. <a href=index.html>Add products to cart</a>";
        totalElement.innerHTML = "";
      } else {
        let out = "";
        for (const key in cart) {
          const productPrice = cart[key] * products[key].price;
          totalPrice += productPrice;

          out += `<button class="delete" data-art="${key}">x</button>`;
          out += `<img src="${products[key].image}">`;
          out += `${products[key].title}`;
          out += `<button class="minus" data-art="${key}">-</button>`;
          out += `${cart[key]}`;
          out += `<button class="plus" data-art="${key}">+</button>`;
          out += `${productPrice.toFixed(2)}`;
          out += "<br>";
        }
        cartElement.innerHTML = out;
        totalElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;

        // Додаємо обробники подій
        const plusButtons = document.querySelectorAll(".plus");
        const minusButtons = document.querySelectorAll(".minus");
        const deleteButtons = document.querySelectorAll(".delete");

        plusButtons.forEach((button) => {
          button.addEventListener("click", plusProducts);
        });

        minusButtons.forEach((button) => {
          button.addEventListener("click", minusProducts);
        });

        deleteButtons.forEach((button) => {
          button.addEventListener("click", deleteProducts);
        });
      }
    }

    function plusProducts() {
      const articul = this.getAttribute("data-art");
      cart[articul]++;
      saveCartToLS();
      showCart();
    }

    function minusProducts() {
      const articul = this.getAttribute("data-art");
      if (cart[articul] > 1) {
        cart[articul]--;
      } else {
        delete cart[articul];
      }
      saveCartToLS();
      showCart();
    }

    function deleteProducts() {
      const articul = this.getAttribute("data-art");
      delete cart[articul];
      saveCartToLS();
      showCart();
    }
  });

function checkCart() {
  // Перевіряємо, чи є корзина в localStorage
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
  }
}

function saveCartToLS() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
