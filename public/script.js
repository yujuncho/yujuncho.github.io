// Form Handlers
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

function focusOnMessageDiv() {
  document.getElementById("message").focus();
}

document
  .getElementById("message-label")
  .addEventListener("click", focusOnMessageDiv);
document
  .getElementById("message-hidden-textarea")
  .addEventListener("focus", focusOnMessageDiv);

document.getElementById("submit-form-btn").addEventListener("submit", event => {
  event.preventDefault();
  let contactFormURL =
    "https://script.google.com/macros/s/AKfycbxZcgk6CzEu25whV64hQjp9AhnWOZEnKQ8iS00B0JYatAiSBOSTvOyNV6jHtvq405v0/exec";
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").innerText
  };

  // Validate form
  document.getElementById("message-hidden-textarea").value = data.message;
  if (document.getElementById("contact-form").reportValidity()) {
    fetch(contactFormURL, {
      method: "GET",
      data: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
});
