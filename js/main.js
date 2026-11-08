/* ================================
   MOBILE MENU
================================ */

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/* Open menu */

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Close menu */

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* Close menu when clicking navigation */

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});

/* ================================
   DARK / LIGHT MODE
================================ */

const themeButton = document.getElementById("theme-button");
const themeIcon = themeButton.querySelector("i");

/* Check saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");

  themeIcon.classList.remove("ri-moon-line");
  themeIcon.classList.add("ri-sun-line");
}

/* Toggle theme */

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");

  if (isDark) {
    themeIcon.classList.remove("ri-moon-line");
    themeIcon.classList.add("ri-sun-line");

    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("ri-sun-line");
    themeIcon.classList.add("ri-moon-line");

    localStorage.setItem("theme", "light");
  }
});

/* ================================
   SHOW SCROLL UP
================================ */

const scrollUp = document.getElementById("scroll-up");

function scrollUpButton() {
  if (window.scrollY >= 500) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollUpButton);

/* ================================
   CURRENT YEAR
================================ */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ================================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.innerHTML = `
            Sending...
            <i class="ri-loader-4-line"></i>
        `;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactMessage.textContent = "Message sent successfully. Thank you!";

        contactMessage.classList.add("success-message");

        contactForm.reset();
      } else {
        contactMessage.textContent =
          "Failed to send message. Please try again.";

        contactMessage.classList.add("error-message");
      }
    } catch (error) {
      contactMessage.textContent = "Something went wrong. Please try again.";

      contactMessage.classList.add("error-message");
    }

    submitButton.disabled = false;

    submitButton.innerHTML = `
            Send Message
            <i class="ri-send-plane-line"></i>
        `;
  });
}

/* ================================
   HEADER SCROLL
================================ */

const header = document.getElementById("header");

function scrollHeader() {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ================================
   ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active-link");

          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
