document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  function updateCartUI() {
    cartItems.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      cartItems.innerHTML += `
                  <tr>
                      <td><img src="${item.image}" alt="${
        item.name
      }" width="50"> ${item.name}</td>
                      <td>₦${item.price.toLocaleString()}</td>
                      <td>
                          <button class="decrease" data-index="${index}">-</button>
                          ${item.quantity}
                          <button class="increase" data-index="${index}">+</button>
                      </td>
                      <td>₦${itemSubtotal.toLocaleString()}</td>
                      <td><button class="remove-item" data-index="${index}">X</button></td>
                  </tr>
              `;
    });

    cartSubtotal.textContent = ` ₦${subtotal.toLocaleString()}`;
    cartTotal.textContent = ` ₦${subtotal.toLocaleString()}`;
    cartCount.textContent = cart.length;

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItems.addEventListener("click", function (e) {
    if (e.target.classList.contains("increase")) {
      const index = e.target.getAttribute("data-index");
      cart[index].quantity++;
      updateCartUI();
    } else if (e.target.classList.contains("decrease")) {
      const index = e.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCartUI();
    } else if (e.target.classList.contains("remove-item")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      updateCartUI();
    }
  });

  updateCartUI();
});
