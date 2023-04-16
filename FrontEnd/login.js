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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response =>{
    if (response.ok) { // statut compris entre 200 et 299
      console.log("autorisé");
      return response.json();
    } else {
      displaySubmitError(response.status);
    }
  })
  .then(data => {
    const token = data.token;
    sessionStorage.setItem("token", data.token);
    window.location.href = "index.html";
  })
  .catch(error => console.error(error));
});

function displaySubmitError(errorType){
  switch (errorType){
    case 401:
      console.log("L'identifiant ou le mot de passe est incorrect");
      emailInput.style.boxShadow = "0 0 0 2px #e74c3c";
      passwordInput.style.boxShadow = "0 0 0 2px #e74c3c";
      break;
    case 404:
      console.log("L'identifiant n'est pas reconnu dans la base de donnée");
      emailInput.style.boxShadow = "0 0 0 2px #e74c3c";
      break;
    default:
      console.log("on ne connait pas l'erreur");
  }
}