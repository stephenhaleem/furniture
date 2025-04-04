// Hero animations
gsap.from(".hero-background", {
  scrollTrigger: {
    trigger: "#hero",
    scrub: true,
  },
  y: "20%",
  ease: "none",
});

gsap.from(".hero-content h2", {
  duration: 1.2,
  opacity: 0,
  y: 60,
  ease: "power3.out",
});
gsap.from(".hero-ctas a", {
  duration: 1,
  opacity: 0,
  y: 40,
  stagger: 0.2,
  delay: 0.5,
  ease: "power3.out",
});

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
gsap.registerPlugin(ScrollTrigger);

gsap.from(".about-img", {
  opacity: 0,
  x: -100,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".about-heading", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

gsap.from(".about-description", {
  opacity: 0,
  y: 30,
  stagger: 0.3,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

gsap.from(".about-btn", {
  opacity: 0,
  scale: 0.8,
  duration: 1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});
const images = document.querySelectorAll(".image-slider img");
let current = 0;
setInterval(() => {
  images[current].style.opacity = 0;
  current = (current + 1) % images.length;
  images[current].style.opacity = 1;
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
  // Animate Brand Logos
  gsap.from(".brand-logo", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#brand-partners",
      start: "top 80%",
    },
  });

  // Animate Heading
  gsap.from("#brand-partners h2", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#brand-partners",
      start: "top 80%",
    },
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterEmail = document.getElementById("newsletter-email");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });

  // Animate Newsletter Section
  gsap.from("#newsletter h2", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#newsletter",
      start: "top 80%",
    },
  });

  gsap.from("#newsletter-form", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#newsletter",
      start: "top 80%",
    },
  });

  // Animate Footer
  gsap.from(".footer-column", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#footer",
      start: "top 80%",
    },
  });
});
