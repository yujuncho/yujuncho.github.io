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
  let contactFormURL =
    "https://script.google.com/macros/s/AKfycbxCxAmU9dCcvSHDVJke5nEtHVqUtMMlLeeVLJu389yJ721kyKXTBmmcLcSVI-uEYVnp/exec";
  fetch(contactFormURL, {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      formPosted();
    })
    .catch(error => {
      console.log(error);
      formPosted(error);
    });
}

function formPosted(error = null) {
  if (error != null) {
  } else {
    /*
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").innerText = "";
    document.getElementById("message-hidden-textarea").value = "";
    */
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
