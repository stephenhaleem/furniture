// Hero animations
gsap.from(".hero-content h2", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  ease: "power3.out",
});
gsap.from(".show-more-btn", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  delay: 0.5,
  ease: "power3.out",
});
gsap.from("#hero img", {
  duration: 1.5,
  opacity: 0,
  scale: 0.9,
  delay: 0.2,
  ease: "power3.out",
});

// Products section animations
gsap.from("#products h2", {
  duration: 1,
  opacity: 0,
  y: 50,
  delay: 1,
  ease: "power3.out",
});
gsap.from(".category", {
  duration: 1,
  opacity: 0,
  y: 50,
  stagger: 0.2,
  delay: 1.5,
  ease: "power3.out",
});

// Featured section animations
gsap.from("#featured img", {
  duration: 1,
  opacity: 0,
  x: -50,
  delay: 2,
  ease: "power3.out",
});
gsap.from(".featured-content", {
  duration: 1,
  opacity: 0,
  x: 50,
  delay: 2.2,
  ease: "power3.out",
});

// Order section animation
gsap.from("#order", {
  duration: 1,
  opacity: 0,
  y: 50,
  delay: 2.5,
  ease: "power3.out",
});

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
// Change header background on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
