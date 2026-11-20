//  form
console.log("yeahhh i'm working");
let cyberForm = document.getElementById("cyberForm");

let device = document.getElementById("device");
let deviceType = document.getElementById("deviceType");

let formMessage = document.getElementById("formMessage");

device.onchange = function () {
  // Remove the previous options
  deviceType.innerHTML = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose a model";

  deviceType.appendChild(defaultOption);

  let models = [];

  if (device.value === "computer") {
    models = ["Desktop PC", "Laptop", "MacBook"];
  } else if (device.value === "smartphone") {
    models = ["iPhone", "Samsung Galaxy", "Google Pixel"];
  } else if (device.value === "tablet") {
    models = ["iPad", "Samsung Galaxy Tab", "Microsoft Surface"];
  }

  for (let i = 0; i < models.length; i++) {
    let option = document.createElement("option");

    option.value = models[i];
    option.textContent = models[i];

    deviceType.appendChild(option);
  }
  if (device.value !== "") {
    deviceType.disabled = false;
  } else {
    deviceType.disabled = true;
    defaultOption.textContent = "Select a device first";
  }
};

// validate the form

cyberForm.onsubmit = function (event) {
  // Prevent the page from reloading
  event.preventDefault();

  let valid = true;

  // Get the values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let birthdate = document.getElementById("birthdate").value;
  let selectedDevice = device.value;
  let selectedModel = deviceType.value;
  let consent = document.getElementById("consent").checked;

  // Clear previous error messages
  let errors = document.getElementsByClassName("error-message");

  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }

  let inputs = cyberForm.querySelectorAll("input, select");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("input-error");
  }

  formMessage.textContent = "";
  formMessage.className = "form-message";

  // check fyll name

  if (name === "") {
    document.querySelector("#name + .error-message").textContent =
      "Please enter your full name.";

    document.getElementById("name").classList.add("input-error");

    valid = false;
  }

  // check email

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    document.querySelector("#email + .error-message").textContent =
      "Please enter your email address.";

    document.getElementById("email").classList.add("input-error");

    valid = false;
  } else if (!emailPattern.test(email)) {
    document.querySelector("#email + .error-message").textContent =
      "Please enter a valid email address.";

    document.getElementById("email").classList.add("input-error");

    valid = false;
  }


  // check password
  if (password === "") {
    document.querySelector("#password + .error-message").textContent =
      "Please enter a password.";

    document.getElementById("password").classList.add("input-error");

    valid = false;
  } else if (password.length < 8) {
    document.querySelector("#password + .error-message").textContent =
      "Your password must contain at least 8 characters.";

    document.getElementById("password").classList.add("input-error");

    valid = false;
  }

  // check date of birth
  let dateParts = birthdate.split("/");
  let day = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]);
  let year = parseInt(dateParts[2]);
  if (dateParts.length !== 3 ||
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        year < 1900) {

        document.querySelector("#birthdate + .error-message").textContent =
            "Please enter a valid date (DD/MM/YYYY).";

        valid = false;
    }
  

  // check device

  if (selectedDevice === "") {
    document.querySelector("#device + .error-message").textContent =
      "Please choose your main device.";

    document.getElementById("device").classList.add("input-error");

    valid = false;
  }

  // check the device model

  if (selectedModel === "") {
    document.querySelector("#deviceType + .error-message").textContent =
      "Please choose your device model.";

    document.getElementById("deviceType").classList.add("input-error");

    valid = false;
  }

  // check operating styem section

  let operatingSystems = document.getElementsByName("os");
  let selectedOS = false;

  for (let i = 0; i < operatingSystems.length; i++) {
    if (operatingSystems[i].checked) {
      selectedOS = true;
    }
  }

  if (selectedOS === false) {
    document.getElementById("osError").textContent =
      "Please select your operating system.";

    valid = false;
  }

  // check consent

  if (consent === false) {
    document.getElementById("consentError").textContent =
      "You must agree before submitting the form.";

    valid = false;
  }

  // display the results

  if (valid === true) {
    formMessage.textContent =
      "Thank you! Your answers have been submitted successfully.";

    formMessage.classList.add("success");

    cyberForm.reset();

    deviceType.innerHTML = "<option value=''>Select a device first</option>";
    deviceType.disabled = true;
  } else {
    formMessage.textContent =
      "Please check the highlighted fields and try again.";

    formMessage.classList.add("error");
  }
}
