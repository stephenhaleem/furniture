document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const couponCodeInput = document.getElementById("coupon-code");
  const clearCartBtn = document.getElementById("clear-cart");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  let discount = 0;

  // Dummy coupon codes
  const coupons = {
    SAVE10: 0.1, // 10% off
    FURN20: 0.2, // 20% off
  };

  function updateCartUI() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="50"> ${
        item.name
      }</td>
        <td>₦${item.price.toLocaleString()}</td>
        <td>
          <button class="decrease" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase" data-index="${index}">+</button>
        </td>
        <td>₦${itemSubtotal.toLocaleString()}</td>
        <td><button class="remove-item" data-index="${index}">X</button></td>
      `;
      cartItems.appendChild(row);

      // Animate new rows
      gsap.from(row, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    const discountedTotal = subtotal * (1 - discount);
    cartSubtotal.textContent = subtotal.toLocaleString();
    cartTotal.textContent = discountedTotal.toLocaleString();
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Cart Item Actions
  cartItems.addEventListener("click", function (e) {
    const index = parseInt(e.target.getAttribute("data-index"));

    if (e.target.classList.contains("increase")) {
      cart[index].quantity++;
      updateCartUI();
    } else if (e.target.classList.contains("decrease")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCartUI();
    } else if (e.target.classList.contains("remove-item")) {
      cart.splice(index, 1);
      updateCartUI();
    }
  });

  // Apply Coupon
  applyCouponBtn.addEventListener("click", () => {
    const code = couponCodeInput.value.trim().toUpperCase();
    if (coupons[code]) {
      discount = coupons[code];
      updateCartUI();
      showNotification(`Coupon "${code}" applied! ${discount * 100}% off`);
    } else {
      showNotification("Invalid coupon code");
    }
    couponCodeInput.value = "";
  });

  // Clear Cart
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    discount = 0;
    updateCartUI();
    showNotification("Cart cleared");
  });

  // Notification
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    gsap.fromTo(
      notification,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    setTimeout(() => {
      gsap.to(notification, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => notification.classList.remove("show"),
      });
    }, 3000);
  }

  // Navigation Toggle
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
  navClose.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  // Initial Animations
  gsap.from(".cart-container", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".cart-table th", {
    opacity: 0,
    x: -20,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".cart-actions", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.8,
  });

  gsap.from(".cart-summary", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    delay: 1,
  });

  updateCartUI();
});
