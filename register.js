window.onload = function () {
  let content = document.getElementById("content");
  let body = document.querySelector("body");
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (localStorage.getItem("email")) {
    while (content.childNodes.length > 0) {
      content.removeChild(content.firstChild);
    } // Or content.innerHtml = "" but I need to use remove in this project and idk where.

    let message = document.createElement("div");
    message.classList.add("red");
    message.innerHTML = `User with email ${localStorage.getItem(
      "email"
    )} is already logged in.`;

    content.appendChild(message);

    logOut = document.createElement("button");
    logOut.addEventListener("click", function () {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      window.location.reload();
    });
    logOut.innerHTML = "Deconectați-vă";
    logOut.style.color = window
      .getComputedStyle(message)
      .getPropertyValue("background-color");
    logOut.style.border = "1px solid black";
    content.appendChild(logOut);
    content.appendChild(buttonBack);
  } else {
    function colorWithARandomColor(element) {
      let colors = ["#F5F5F5", "#E1F5FE", "#C8E6C9", "#FFFFE0"];
      let colorIndex = Math.floor(Math.random() * colors.length);
      element.style.backgroundColor = colors[colorIndex];
    }

    colorWithARandomColor(document.getElementById("register"));
    colorWithARandomColor(body);

    // Add warning message for invalid email.
    document
      .getElementById("email")
      .addEventListener("keyup", function (event) {
        event.preventDefault();
        let email = this.value;
        let message = document.getElementById("message");

        if (!email.match(emailPattern)) {
          message.textContent =
            "Te rugăm să introduci o adresă de e-mail validă.";
        } else {
          message.textContent = "";
        }
      });

    // Add warning message for invalid second password.
    document
      .getElementById("confirmpassword")
      .addEventListener("keyup", function (event) {
        event.preventDefault();
        let password = document.getElementById("password").value;
        let password2 = this.value;
        let message = document.getElementById("message");

        // console.log(password, password2);
        if (password != password2) {
          message.textContent = "Cele doua parole sunt diferite.";
        } else {
          message.textContent = "";
        }
      });

    // Check entire form and show red border for invalid ones with setTimeout
    document
      .getElementById("register")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        let password = document.getElementById("password");
        let password2 = document.getElementById("confirmpassword");
        let message = document.getElementById("message");

        if (password.value === "" || email.value === "" || password2 === "") {
          colorBorderInputsWithRed();
          message.textContent = "Toate câmpurile trebuie completate.";
          return false;
        }

        if (!email.value.match(emailPattern)) {
          email.style.borderColor = "red";
          setTimeout(() => (email.style.borderColor = "black"), 2500);
          return false;
        }

        if (password.value != password2.value) {
          password.style.borderColor = "red";
          password2.style.borderColor = "red";
          setTimeout(() => {
            password.style.borderColor = "black";
            password2.style.borderColor = "black";
          }, 2500);
          return false;
        }

        localStorage.setItem("email", email.value);
        localStorage.setItem("password", window.btoa(password.value));
        message.textContent = "Formularul a fost trimis cu succes!";
        window.location.reload();
        return true;
      });

    function colorBorderInputsWithRed() {
      let inputElements = document.getElementsByTagName("input");
      for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].style.borderColor = "red";
        setTimeout(() => (inputElements[i].style.borderColor = "black"), 2500);
      }
    }
  }
};
