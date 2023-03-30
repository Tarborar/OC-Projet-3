const sectionGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filters = document.querySelector(".filtres");
const modifyButtonEdition = document.querySelectorAll(".modifierButton");
const modifyHeaderEdition = document.querySelector(".modifierHeader");
const header = document.querySelector("header");
const login = document.querySelector("#login");
const displayAddWorkButton = document.querySelector("#ajouterProjet");
const overlay = document.querySelector("#overlay");
const body = document.querySelector("body");

let works;
let categories;
let filtersName;
let editMode = false;
let addWorkModalInterface;

const errorMessage = `
    <p class="messageErreur">
        Il semblerait que les projets soient indisponibles pour le moment !
    </p>
`;

fetchWorks();

async function fetchWorks(filteredWorks){
    sectionGallery.innerHTML = ""; //erase pour construire à blanc
    filters.innerHTML = "";

    try{
        const response = await fetch('http://localhost:5678/api/works');
        works = await response.json();

        console.log("Récupération de tous les works :");
        console.log(works);

        categories = works.map(work => work.category.name); // créé un tableau de tous les noms de catégories
        filtersName = categories.filter((category, current) => categories.indexOf(category) === current); //supprime les doublons 
        filtersName.unshift("Tous"); //ajoute "Tous" dans les filtres
        console.log("Récupération de tous les filtres :");
        console.log(filtersName);

        if(filteredWorks != null){
            displayWorks(filteredWorks);
        } 
        else{
            displayWorks(works);
        }
        
        displayFilters(filtersName);

    } catch (error){
        console.error("Une erreur est survenue:", error);
        portfolio.innerHTML = errorMessage; //affiche interface d'erreur
    }
}

function displayWorks(works){ //reçois tous les works OU les filtredWorks
    for (let i = 0; i < works.length; i++){
        const project = works[i];
        const photoElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        const textElement = document.createElement("figcaption");
        textElement.innerText = project.title;
        sectionGallery.appendChild(photoElement);
        photoElement.appendChild(imageElement);
        photoElement.appendChild(textElement);
        /* 
        <figure>
            <img src="" alt="">
            <figcaption></figcaption>
        </figure>
        */

        if (editMode === true){
            const modalWorks = document.querySelector(".modalWorks"); //test modale
            const imageModale = document.createElement("img");
            imageModale.src = project.imageUrl;
            modalWorks.appendChild(imageModale);
        }
    }
}

function displayFilters(filtersName){
    const ulFilter = document.createElement("ul");
    ulFilter.classList.add("rangeFiltre", "fontFiltre");
    
    for (let i=0; i < filtersName.length; i++){
        const liFilter = document.createElement("li");
        liFilter.innerText = filtersName[i];
        liFilter.classList.add ("boutonFiltre");
        ulFilter.appendChild(liFilter);
    }
    
    ulFilter.children[0].classList.add("filtreActive"); //filtreActive sur le premier filtre "Tous"
    
    filters.appendChild(ulFilter);
    /*
    <ul class="rangeFiltre fontFiltre">
        <li class="boutonFiltre filtreActive">Tous</li>
        <li class="boutonFiltre">Objets</li>
        <li class="boutonFiltre">Appartements</li>
        <li class="boutonFiltre">Hôtels & restaurants</li>
    </ul>
    */

   filtering();
}

function filtering(){
    const filterButtons = document.querySelectorAll(".boutonFiltre"); //ici parce que la class boutonFiltre n'existe pas encore

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.innerText;
            console.log(`Le filtre ${button.innerText} a été cliqué`);
            
            // filterButtons.forEach(b => b.classList.remove("filtreActive")); //supprime tous les filtreActive
            // button.classList.add("filtreActive"); //met filtreActive sur le filtre cliqué

            let filteredWorks;
            if (filterValue === "Tous"){
                filteredWorks = works; //Tous les works générés du fetch
            } else{
                filteredWorks = works.filter(work => work.category.name === filterValue); //catégorie égal au nom du bouton
            }

            fetchWorks(filteredWorks);
        });
    }); 
}

if (sessionStorage.getItem('token')){
    //Vérifie s'il y a un le token dans le session storage
    console.log("Entre dans le mode édition");
    editMode = true;
    addEditionMode();
} else {
    console.log("Il n'y a pas le token dans le session storage");
}

function addEditionMode(){
    const headerModeEdition = `
    <div id="edition">
        <div>
        <i class="fa-regular fa-pen-to-square"></i>
        <p class="textEdition">Mode édition</p>
        </div>
        <button class="buttonEdition">publier les changements</button>
    </div>
    `;

    const modifyModeEdition = `
    <div class="modifier">
        <i class="fa-regular fa-pen-to-square"></i>
        <p class="textModifier">modifier</p>
    </div>
    `;

    login.innerHTML = "logout";

    login.addEventListener("click", function() {
        if(sessionStorage.getItem("token")) {
            // Suppression de l'élément ayant la clé "myKey"
            console.log("Retrait du token dans le session storage");
            sessionStorage.removeItem("token");
            login.innerHTML = "login";
          }
    });

    modifyHeaderEdition.innerHTML = headerModeEdition;
    header.style.marginTop = "100px";

    for (let i = 0; i < modifyButtonEdition.length; i++) {
        modifyButtonEdition[i].innerHTML = modifyModeEdition;
    }

    displayAddWorkInterface();
}

function displayAddWorkInterface(){
    console.log("Ouverture de l'interface de l'ajout de projet");
    
    const test = document.createElement("div");
    test.classList.add("addWorkModalInterface");
    body.appendChild(test);
    addWorkModalInterface = document.querySelector(".addWorkModalInterface");
    const truc = `
        <p id="modalTitle">Galerie photo</p>
        <div class="modalWorks">
            
        </div>
        <button id="addWorksButton">Ajouter une photo</button>
        <p id="deleteWorksButton">Supprimer la galerie</p>
    `;
    addWorkModalInterface.innerHTML = truc;
    const modalWorks = document.querySelector(".modalWorks"); //test modale
}

displayAddWorkButton.addEventListener("click", function() { //quand modifier est cliqué
    overlay.style.display = "block"; 
    addWorkModalInterface.style.display = "block";
});