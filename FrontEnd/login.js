const login = document.querySelector("#login");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const logo = document.querySelector("#nomLogo");
const projets = document.querySelector("#projets");
const contact = document.querySelector("#contact");

const mainPage = main.innerHTML;

const loginPage = `
<div id="loginPage">
	<section class="remplissage">
		<h2>Login</h2>
		<form action="#" method="post">
			<label for="email">Email</label>
			<input type="email" name="email" id="email">
			<label for="pass">Mot de passe</label>
			<input type="password" name="password" id="password" required>
			<input type="submit" value="Se connecter">
		</form>
	</section>
</div>
`
//Vide le <main> pour le remplacer par le code loginPage
login.addEventListener("click", function(){
	main.innerHTML = loginPage;
	footer.style.bottom = "0"; //met le footer en bas
});

class Menu {
	constructor(id) {
		this.id = id;
		this.id.addEventListener('click', () => {
			main.innerHTML = mainPage;
			footer.style.removeProperty('bottom'); //remet le footer en bas
			chargement();
			activationFiltreur(); //réactive la classe écrasé par innerHTML
	  	});
	};
}

const menuLogo = new Menu(logo); //nom #id
const menuProjets = new Menu(projets);
const menuContact = new Menu(contact);



