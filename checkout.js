document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItemsList = document.getElementById("order-items");
  const subtotalElem = document.getElementById("subtotal");
  const shippingCostElem = document.getElementById("shipping-cost");
  const totalPriceElem = document.getElementById("total-price");
  const checkoutForm = document.getElementById("checkout-form");
  const shippingMethod = document.getElementById("shipping-method");
  const paymentMethod = document.getElementById("payment");
  const paymentDetails = document.getElementById("payment-details");
  const modal = document.getElementById("confirmation-modal");
  const modalTotal = document.getElementById("modal-total");
  const closeModalBtn = document.getElementById("close-modal");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  let subtotal = 0;
  let shippingCost = 0;

  // Populate Order Summary
  cartItems.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} x${item.quantity} <strong>₦${(
      item.price * item.quantity
    ).toLocaleString()}</strong>`;
    orderItemsList.appendChild(listItem);
    subtotal += item.price * item.quantity;

    gsap.from(listItem, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Update Totals
  function updateTotals() {
    shippingCost =
      parseInt(shippingMethod.selectedOptions[0].dataset.cost) || 0;
    const total = subtotal + shippingCost;
    subtotalElem.textContent = subtotal.toLocaleString();
    shippingCostElem.textContent = shippingCost.toLocaleString();
    totalPriceElem.textContent = total.toLocaleString();
    modalTotal.textContent = total.toLocaleString();
  }

  updateTotals();

  // Update Cart Count
  document.getElementById("cart-count").textContent = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Shipping Method Change
  shippingMethod.addEventListener("change", updateTotals);

  // Payment Method Details
  paymentMethod.addEventListener("change", () => {
    paymentDetails.innerHTML = "";
    paymentDetails.classList.remove("active");

    if (paymentMethod.value === "card") {
      paymentDetails.innerHTML = `
        <label for="card-number">Card Number:</label>
        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />
        <label for="expiry">Expiry Date:</label>
        <input type="text" id="expiry" placeholder="MM/YY" required />
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" placeholder="123" required />
      `;
      paymentDetails.classList.add("active");
    } else if (paymentMethod.value === "transfer") {
      paymentDetails.innerHTML = `
        <p>Please transfer ₦${(
          subtotal + shippingCost
        ).toLocaleString()} to:</p>
        <p><strong>Bank:</strong> FurniCraft Bank</p>
        <p><strong>Account:</strong> 1234567890</p>
      `;
      paymentDetails.classList.add("active");
    }

    gsap.from(".payment-details.active", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // Form Submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    // Validation
    if (!name || !email || !phone || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ""))) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    if (paymentMethod.value === "card") {
      const cardNumber = document.getElementById("card-number")?.value.trim();
      const expiry = document.getElementById("expiry")?.value.trim();
      const cvv = document.getElementById("cvv")?.value.trim();

      if (
        !cardNumber ||
        !expiry ||
        !cvv ||
        !/^\d{16}$/.test(cardNumber.replace(/\D/g, ""))
      ) {
        alert("Please enter valid card details.");
        return;
      }
    }

    // Show Confirmation Modal
    gsap.to(".checkout-container", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "flex";
        gsap.from(".modal-content", {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      },
    });
  });

  // Close Modal
  closeModalBtn.addEventListener("click", () => {
    gsap.to(".modal-content", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
        localStorage.removeItem("cart");
        window.location.href = "order.html";
      },
    });
  });

  // Navigation Toggle
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
  navClose.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  // Initial Animations
  gsap.from(".progress-bar .step", {
    opacity: 0,
    x: -20,
    stagger: 0.2,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.from(".checkout-container", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from(".form-group", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".form-actions", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    delay: 1,
  });
});
