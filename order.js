document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = button.closest(".product-card");
      const productName = productCard
        .querySelector(".product-name")
        .textContent.trim();
      const productPrice = parseFloat(
        productCard
          .querySelector(".product-price")
          .textContent.replace("₦", "")
          .replace(",", "")
      );
      const productImage = productCard.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(
        (item) => item.name === productName
      );
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          quantity: 1,
          image: productImage,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Show a notification that the item was added
      function showNotification(message) {
        let notification = document.getElementById("notification");
        if (!notification) {
          notification = document.createElement("div");
          notification.id = "notification";
          document.body.appendChild(notification);
        }
        notification.textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
          notification.className = notification.className.replace("show", "");
        }, 3000);
      }
    });
  });
});
