/* CONTACT FORM */

// Label focus effects
function addLabelEventListeners(inputId) {
  let nameInput = document.getElementById(inputId);
  nameInput.addEventListener("focus", () => {
    document.getElementById(`${inputId}-label`).classList.add("is-active");
  });
  nameInput.addEventListener("blur", () => {
    document.getElementById(`${inputId}-label`).classList.remove("is-active");
  });
}
addLabelEventListeners("name");
addLabelEventListeners("email");
addLabelEventListeners("message");

// Focus events for the contenteditable field #message
function addFocusEventsForMessage() {
  function focusOnMessageDiv() {
    document.getElementById("message").focus();
  }

  document
    .getElementById("message-label")
    .addEventListener("click", focusOnMessageDiv);
  document
    .getElementById("message-hidden-textarea")
    .addEventListener("focus", focusOnMessageDiv);
}
addFocusEventsForMessage();

// Handling form submission
function postToGoogleSheets(data) {
  let formIcon = document.getElementById("submit-form-icon");
  formIcon.className = "fa fa-spinner fa-spin mr-1";

  let contactFormURL =
    "https://script.google.com/macros/s/AKfycbxCxAmU9dCcvSHDVJke5nEtHVqUtMMlLeeVLJu389yJ721kyKXTBmmcLcSVI-uEYVnp/exec";

  fetch(contactFormURL, {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(data => {
      formPosted();
    })
    .catch(error => {
      formPosted(error);
    });
}

function formPosted(error = null) {
  let formIcon = document.getElementById("submit-form-icon");
  formIcon.className = "fa fa-paper-plane mr-1";

  let alert = document.getElementById("submit-form-alert");
  let alertMessage = document.getElementById("submit-form-alert-message");

  if (error !== null) {
    alert.className = "alert alert-danger alert-dismissible fade show";
    alertMessage.innerText = error;
  } else {
    alert.className = "alert alert-success alert-dismissible fade show";
    alertMessage.innerText = "Message sent successfully!";
  }
}

function submitFormHandler(event) {
  event.preventDefault();

  let messageText = document.getElementById("message").innerText;
  document.getElementById("message-hidden-textarea").value = messageText;

  let contactForm = document.getElementById("contact-form");
  if (contactForm.reportValidity()) {
    let data = new FormData(contactForm);
    postToGoogleSheets(data);
  }
}

document
  .getElementById("submit-form-btn")
  .addEventListener("click", submitFormHandler);

// Handling closing the form's alert
function closeAlertHandler(event) {
  let alert = document.getElementById("submit-form-alert");
  let alertMessage = document.getElementById("submit-form-alert-message");

  alert.className = "d-none";
  alertMessage.innerText = "";
}

document
  .getElementById("submit-form-alert-close")
  .addEventListener("click", closeAlertHandler);
