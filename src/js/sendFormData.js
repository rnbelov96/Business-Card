import isEmail from "validator/lib/isEmail";
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
