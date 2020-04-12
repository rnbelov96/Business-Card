import "./style/libs/reboot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.sass";
import isEmail from "validator/lib/isEmail";

const headerScrollEl = document.querySelector(".header__scroll-arrow");
const aboutEl = document.querySelector(".about");
headerScrollEl.addEventListener("click", () => {
  const interval = setInterval(() => {
    const aboutCoords = aboutEl.getBoundingClientRect();
    if (aboutCoords.top < 60) {
      clearInterval(interval);
      return;
    }
    window.scrollTo(0, window.pageYOffset + 5);
  }, 0.1);
});

const skillsEl = document.querySelector(".skills");
const worksEl = document.querySelector(".works");
const contactEl = document.querySelector(".contact");
const aboutEl = document.querySelector(".about");

const menuEl = document.querySelector(".menu");
const menuAboutEl = menuEl.children[0];
const menuSkillsEl = menuEl.children[1];
const menuWorksEl = menuEl.children[2];
const menuContactEl = menuEl.children[3];

menuEl.addEventListener("click", (e) => {
  const clickedLogo =
    e.target.tagName === "I" ? e.target.parentElement : e.target;
  let interval;
  let elementToScrollTo;

  switch (clickedLogo) {
    case menuAboutEl:
      elementToScrollTo = aboutEl;
      break;
    case menuSkillsEl:
      elementToScrollTo = skillsEl;
      break;
    case menuWorksEl:
      elementToScrollTo = worksEl;
      break;
    case menuContactEl:
      elementToScrollTo = contactEl;
      break;
    default:
      break;
  }
  const elementCoords = elementToScrollTo.getBoundingClientRect();
  if (elementCoords.top > 0) {
    interval = setInterval(() => {
      const elementCoords = elementToScrollTo.getBoundingClientRect();
      if (elementCoords.top < 60) {
        clearInterval(interval);
        return;
      }
      window.scrollTo(0, window.pageYOffset + 10);
    }, 0.1);
    return;
  }
  interval = setInterval(() => {
    const elementCoords = elementToScrollTo.getBoundingClientRect();
    if (elementCoords.top < 60 && elementCoords.top > 50) {
      clearInterval(interval);
      return;
    }
    window.scrollTo(0, window.pageYOffset - 10);
  }, 0.5);
  return;
});

window.addEventListener("scroll", () => {
  if (contactEl.getBoundingClientRect().top - 300 <= 0) {
    if (menuContactEl.classList.contains("menu__icon_active")) {
      return;
    }
    [...menuEl.children].forEach((el) =>
      el.classList.remove("menu__icon_active")
    );
    menuContactEl.classList.add("menu__icon_active");
    return;
  }
  if (worksEl.getBoundingClientRect().top - 300 <= 0) {
    if (menuWorksEl.classList.contains("menu__icon_active")) {
      return;
    }
    [...menuEl.children].forEach((el) =>
      el.classList.remove("menu__icon_active")
    );
    menuWorksEl.classList.add("menu__icon_active");
    return;
  }
  if (skillsEl.getBoundingClientRect().top - 300 <= 0) {
    if (menuSkillsEl.classList.contains("menu__icon_active")) {
      return;
    }
    [...menuEl.children].forEach((el) =>
      el.classList.remove("menu__icon_active")
    );
    menuSkillsEl.classList.add("menu__icon_active");
    return;
  }
  if (aboutEl.getBoundingClientRect().top - 300 <= 0) {
    if (menuAboutEl.classList.contains("menu__icon_active")) {
      return;
    }
    [...menuEl.children].forEach((el) =>
      el.classList.remove("menu__icon_active")
    );
    menuAboutEl.classList.add("menu__icon_active");
    return;
  }
  [...menuEl.children].forEach((el) =>
    el.classList.remove("menu__icon_active")
  );
});

const formEl = document.getElementById("message-form");
const emailInputEl = formEl.elements.namedItem("email");
const submitButtonEl = document.querySelector(".contact__button");
const dangerAlertEl = document.querySelector(".alert-danger");
const successAlertEl = document.querySelector(".alert-success");
let alertTimer;

formEl.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    clearInterval(alertTimer);

    submitButtonEl.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const formData = new FormData(formEl);

    const dataToSend = {};

    for (let [name, value] of formData) {
      dataToSend[name] = value;
    }

    if (!isEmail(dataToSend.email)) {
      submitButtonEl.textContent = "SUBMIT";
      dangerAlertEl.textContent = "Please enter a valid email.";
      dangerAlertEl.style.display = "block";
      emailInputEl.focus();
      window.scrollTo(
        0,
        window.pageYOffset + emailInputEl.getBoundingClientRect().top - 180
      );
      alertTimer = setInterval(() => {
        dangerAlertEl.style.display = "none";
      }, 3000);
      return;
    }

    const response = await fetch("https://roh7771-summary-api.glitch.me/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    const { status } = result;

    if (status === "success") {
      formEl.reset();
      successAlertEl.style.display = "block";
      alertTimer = setInterval(() => {
        successAlertEl.style.display = "none";
      }, 5000);
    }

    if (status === "failed") {
      dangerAlertEl.textContent = "Please enter a valid data";
      dangerAlertEl.style.display = "block";
      alertTimer = setInterval(() => {
        dangerAlertEl.style.display = "none";
      }, 3000);
    }
    submitButtonEl.textContent = "SUBMIT";
  } catch (err) {
    dangerAlertEl.textContent = "Something went wrong. Please try again later";
    dangerAlertEl.style.display = "block";
    submitButtonEl.textContent = "SUBMIT";
    alertTimer = setInterval(() => {
      dangerAlertEl.style.display = "none";
    }, 3000);
  }
});




