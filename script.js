const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const fields = {
    name: contactForm.elements.name,
    email: contactForm.elements.email,
    message: contactForm.elements.message
  };

  const setError = (field, message) => {
    const error = document.querySelector(`#${field.id}-error`);
    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const validateField = (field) => {
    const value = field.value.trim();
    if (!value) {
      setError(field, `${field.labels?.[0]?.textContent || "This field"} is required.`);
      return false;
    }
    if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(value)) {
        setError(field, "Enter a valid email address.");
        return false;
      }
    }
    setError(field, "");
    return true;
  };

  Object.values(fields).forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = Object.values(fields).map(validateField).every(Boolean);
    const status = contactForm.querySelector(".form-status");
    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      const firstInvalid = contactForm.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    status.textContent = "Demo form complete — no message was sent or stored.";
    contactForm.reset();
  });
}
