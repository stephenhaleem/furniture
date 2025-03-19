document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const sortFilter = document.getElementById("sort-filter");
  const searchInput = document.getElementById("search-input");
  const productsContainer = document.querySelector(".products");
  const products = Array.from(document.querySelectorAll(".product-card"));
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  // Cart Count Update
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
  }

  // Add to Cart
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.closest(".sold-out")) return;

      const productCard = button.closest(".product-card");
      const productName = productCard
        .querySelector(".product-name")
        .textContent.trim();
      const productPrice = parseFloat(productCard.dataset.price);
      const productImage = productCard.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
      showNotification(`${productName} added to cart!`);
    });
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

  // Filter and Sort Products
  function applyFiltersAndSort() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const sortOption = sortFilter.value;
    const searchQuery = searchInput.value.toLowerCase();

    // Filter products
    let filteredProducts = products.filter((product) => {
      const price = parseFloat(product.dataset.price);
      const productCategory = product.dataset.category;
      const productName = product.dataset.name.toLowerCase();

      const categoryMatch = category === "all" || productCategory === category;
      let priceMatch = true;
      if (priceRange === "low") priceMatch = price <= 300000;
      else if (priceRange === "mid")
        priceMatch = price > 300000 && price <= 600000;
      else if (priceRange === "high") priceMatch = price > 600000;

      const searchMatch = productName.includes(searchQuery);

      return categoryMatch && priceMatch && searchMatch;
    });

    // Sort products
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();

      if (sortOption === "price-asc") return priceA - priceB;
      if (sortOption === "price-desc") return priceB - priceA;
      if (sortOption === "name-asc") return nameA.localeCompare(nameB);
      if (sortOption === "name-desc") return nameB.localeCompare(nameA);
      return 0; // Default: no sorting
    });

    // Update DOM
    productsContainer.innerHTML = "";
    filteredProducts.forEach((product) =>
      productsContainer.appendChild(product)
    );

    // Animate filtered products
    gsap.from(filteredProducts, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  // Event Listeners for Filters and Search
  categoryFilter.addEventListener("change", applyFiltersAndSort);
  priceFilter.addEventListener("change", applyFiltersAndSort);
  sortFilter.addEventListener("change", applyFiltersAndSort);
  searchInput.addEventListener("input", applyFiltersAndSort);

  // Navigation Toggle
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
  navClose.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  // Initial Animations
  gsap.from(".product-card", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".checkout-btn", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  // Update cart count on load
  updateCartCount();
});
