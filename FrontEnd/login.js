/*
sophie.bluel@test.tld
S0phie
*/

const footer = document.querySelector("footer");
const loginButton = document.querySelector("#login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");

let email = "";
let password = "";


footer.style.bottom = "0"; //met le footer en bas
loginButton.style.fontWeight = "600";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) { // statut compris entre 200 et 299
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      displaySubmitError(response.status);
    }
  } catch (error) {
    console.error(error);
  }
});

function displaySubmitError(errorType){
  switch (errorType){
    case 401:
      console.log("L'identifiant ou le mot de passe est incorrect");
      passwordInput.style.boxShadow = "0 0 0 2px #e74c3c";
      
      const wrongPassword = document.querySelector(".errorConnectionText");
      if (wrongPassword) { //Si la div est déjà crée
        wrongPassword.innerHTML = "Le mot de passe est incorrect";
      } else { //crée la div avec le texte d'erreur
        const newWrongPassword = document.createElement("div");
        newWrongPassword.classList.add("errorConnectionText");
        newWrongPassword.innerHTML = "Le mot de passe est incorrect";
        passwordInput.parentNode.insertBefore(newWrongPassword, passwordInput.nextSibling);
      }
      
      break;
    case 404:
      console.log("L'identifiant n'est pas reconnu dans la base de donnée");
      emailInput.style.boxShadow = "0 0 0 2px #e74c3c";
      
      const wrongId = document.querySelector(".errorConnectionText");
      if (wrongId) {
        wrongId.innerHTML = "Cet identifiant n'existe pas ";
      } else {
        const newWrongId = document.createElement("div");
        newWrongId.classList.add("errorConnectionText");
        newWrongId.innerHTML = "Cet identifiant n'existe pas ";
        emailInput.parentNode.insertBefore(newWrongId, emailInput.nextSibling);
      }
      
      break;
    default:
      console.log("on ne connait pas l'erreur");
  }
}