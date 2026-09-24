// ===== 1. MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// close the mobile menu automatically after clicking a link
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});


// ===== 2. SMOOTH SCROLL FOR NAV LINKS =====
// selects every link whose href starts with "#" (an in-page anchor)
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===== 3. NAVBAR SHADOW ON SCROLL =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===== 4. FADE-IN ON SCROLL (using IntersectionObserver) =====
// IntersectionObserver watches elements and tells us when they enter the screen.
// This is more efficient than checking scroll position manually for every element.
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target); // stop watching once it's shown, saves performance
    }
  });
}, {
  threshold: 0.15 // triggers when 15% of the element is visible
});

fadeElements.forEach(function (el) {
  fadeObserver.observe(el);
});


// ===== 5. ANIMATED NUMBER COUNTERS (for the stats section) =====
const statNumbers = document.querySelectorAll(".stat-number");

function animateCounter(el) {
  const target = Number(el.getAttribute("data-target"));
  const duration = 1500; // total animation time in milliseconds
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 to 1
    const currentValue = Math.floor(progress * target);

    el.textContent = currentValue.toLocaleString(); // adds commas, e.g. 1,240

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target.toLocaleString(); // make sure it ends exactly on target
    }
  }

  requestAnimationFrame(updateCount);
}

// Only start counting once the stats section actually scrolls into view,
// otherwise numbers would finish counting before the user even sees them.
const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateCounter);
      statsObserver.disconnect(); // only run once
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector(".stats-bar");
if (statsSection) {
  statsObserver.observe(statsSection);
}


// ===== 6. SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});