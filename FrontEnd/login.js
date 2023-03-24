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
      window.location.href = "index.html";
      return response.json();
    } else {
      console.log("pas autorisé");
    }
  })
  .then(data => {
    const token = data.token;
    console.log(token);
  })
  .catch(error => console.error(error));
});

const editionMode = `
    <div id="edition">
      <div>
        <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
        <p class="textEdition">Mode édition</p>
      </div>
      <button class="buttonEdition">publier les changements</button>
    </div>
  `;