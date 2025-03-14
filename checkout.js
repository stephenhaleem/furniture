document.addEventListener("DOMContentLoaded", () => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  let orderItemsList = document.getElementById("order-items");
  let totalPriceElem = document.getElementById("total-price");

  cartItems.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} x${item.quantity} <strong>₦${
      item.price * item.quantity
    }</strong>`;
    orderItemsList.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  totalPriceElem.textContent = totalPrice.toLocaleString();

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "order.html";
  });

  document.getElementById("cart-count").textContent = cartItems.length;
});
