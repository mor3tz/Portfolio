const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");

function setMenuOpen(isOpen) {
  if (!navMenu || !navToggle) return;

  navMenu.classList.toggle("show-menu", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

navToggle?.addEventListener("click", () => {
  setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

navClose?.addEventListener("click", () => setMenuOpen(false));

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu?.classList.contains("show-menu")) {
    setMenuOpen(false);
    navToggle?.focus();
  }
});

const themeButton = document.getElementById("theme-button");
const themeIcon = themeButton?.querySelector("i");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);

  if (themeIcon) {
    themeIcon.classList.toggle("ri-moon-line", !isDark);
    themeIcon.classList.toggle("ri-sun-line", isDark);
  }

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}

try {
  applyTheme(localStorage.getItem("theme") === "dark");
} catch (error) {
  console.error("Could not read the saved theme preference.", error);
  applyTheme(false);
}

themeButton?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-theme");
  applyTheme(isDark);

  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    console.error("Could not save the theme preference.", error);
  }
});

const scrollUp = document.getElementById("scroll-up");
const header = document.getElementById("header");

function updateScrollUI() {
  const isScrolled = window.scrollY >= 50;
  header?.classList.toggle("scroll-header", isScrolled);
  scrollUp?.classList.toggle("show-scroll", window.scrollY >= 500);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML =
      'Sending... <i class="ri-loader-4-line" aria-hidden="true"></i>';
  }

  if (contactMessage) {
    contactMessage.textContent = "";
    contactMessage.classList.remove("success-message", "error-message");
  }

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Contact form request failed with status ${response.status}.`);
    }

    if (contactMessage) {
      contactMessage.textContent = "Message sent successfully. Thank you!";
      contactMessage.classList.add("success-message");
    }

    contactForm.reset();
  } catch (error) {
    console.error("Could not submit the contact form.", error);

    if (contactMessage) {
      contactMessage.textContent =
        "Something went wrong. Please try again or contact me through GitHub.";
      contactMessage.classList.add("error-message");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML =
        'Send Message <i class="ri-send-plane-line" aria-hidden="true"></i>';
    }
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("active-link", isActive);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("show-reveal"));
}
