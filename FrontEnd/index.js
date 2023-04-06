const sectionGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filters = document.querySelector(".filtres");
const modifyButtonEdition = document.querySelectorAll(".modifierButton");
const modifyHeaderEdition = document.querySelector(".modifierHeader");
const header = document.querySelector("header");
const login = document.querySelector("#login");
const displayAddWorkButton = document.querySelector("#ajouterProjet");
const modal = document.querySelector("#modal");
const body = document.querySelector("body");
const addWorkModalInterface = document.querySelector(".addWorkModalInterface");
const modalWorks = document.querySelector(".modalWorks");
const modalGalery = document.querySelector(".modalGalery");
const faXmarks = document.querySelectorAll(".fa-xmark");
const selectFilter = document.querySelector("#selectFilter");
const addWorksButton = document.querySelector("#addWorksButton");
const modalAdd = document.querySelector(".modalAdd");
const returnModalButton = document.querySelector("#returnModalButton");

let works;
let categories;
let filtersName;
let whichFilterActive = 0;
let editMode = false;

const errorMessage = `
    <p class="messageErreur">
        Il semblerait que les projets soient indisponibles pour le moment !
    </p>
`;

fetchWorks();

async function fetchWorks(filteredWorks){
    sectionGallery.innerHTML = ""; //erase pour construire à blanc
    filters.innerHTML = "";
    modalWorks.innerHTML = "";
    selectFilter.innerHTML = "";

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
        
        if (editMode === true){
            displayAllWorksOnModal(works);
            displayAllFiltersOnModal(filtersName);
        }

        displayFilters(filtersName);

    } catch (error){
        console.error("Une erreur est survenue:", error);
        portfolio.innerHTML = errorMessage; //affiche interface d'erreur
    }
}

function displayWorks(works){ //reçoit tous les works OU les filteredWorks
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

        // if (editMode === true){
        //     const modalWorks = document.querySelector(".modalWorks"); //div des works
        //     const imageModale = document.createElement("img");
        //     imageModale.src = project.imageUrl;
        //     modalWorks.appendChild(imageModale);
        // }
    }
}

function displayAllWorksOnModal(works){ //reçoit tous les works si editMode === true
    for (let i = 0; i < works.length; i++){
        const project = works[i];
        const modalWorks = document.querySelector(".modalWorks"); //div des works
        const imageModale = document.createElement("img");
        imageModale.src = project.imageUrl;
        modalWorks.appendChild(imageModale);
    }
}

function displayAllFiltersOnModal(filtersName){ //affiche les filtres dans le select du modale
    
    const option = document.createElement("option"); //désactive la première option
    option.value = "";
    option.text = "";
    option.disabled = true;
    option.selected = true;
    selectFilter.appendChild(option);

    for (let i = 1; i < filtersName.length; i++){
        const option = document.createElement("option");
        option.innerText = filtersName[i];
        selectFilter.appendChild(option);
    }

    
}

function displayFilters(filtersName){ //reçoit le tableau de tous les noms de Filtre
    const ulFilter = document.createElement("ul");
    ulFilter.classList.add("rangeFiltre", "fontFiltre");
    
    for (let i=0; i < filtersName.length; i++){
        const liFilter = document.createElement("li");
        liFilter.innerText = filtersName[i];
        liFilter.classList.add ("boutonFiltre");
        ulFilter.appendChild(liFilter);

        //pour chaque <li> attribue un event Click
        liFilter.addEventListener("click", () => {
            whichFilterActive = i;
            
            for (let i = 0; i < filtersName.length; i++) { //enlève toutes les class filtreActive
            ulFilter.children[i].classList.remove("filtreActive");
            }
    
            //remet la class filtreActive au Click actuel
            liFilter.classList.add("filtreActive");
        });
    }
    
    ulFilter.children[whichFilterActive].classList.add("filtreActive"); //filtreActive sur le premier filtre "Tous"
    
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
    //affiche mode edition si token présent
    console.log("Entre dans le mode édition");
    editMode = true;
    addEditionMode();
} else {
    console.log("Il n'y a pas le token dans le session storage");
}

function addEditionMode(){
    headerModeEdition = `
    <div id="edition">
        <div>
            <i class="fa-regular fa-pen-to-square faPenToSquare"></i>
            <div class="textEdition">Mode édition</p>
        </div>
        <button class="buttonEdition">publier les changements</button>
    </div>
    `;

    const modifyModeEdition = `
    <div class="modifier">
        <i class="fa-regular fa-pen-to-square"></i>
        <div class="textModifier">modifier</p>
    </div>
    `;

    login.innerHTML = "logout"; //remplace login par logout

    modifyHeaderEdition.innerHTML = headerModeEdition;
    header.style.marginTop = "100px"; //ajoute de la place pour le header edition

    for (let i = 0; i < modifyButtonEdition.length; i++) { //pour tous les .modifierBouton met modifyModeEdition
        modifyButtonEdition[i].innerHTML = modifyModeEdition;
    }
}

//affiche modale
displayAddWorkButton.addEventListener("click", function() {
    console.log("Ouverture de la modale");
    fetchWorks();
    modal.style.display = "block"; //background sombre
    addWorkModalInterface.style.display = "block";//enlève display: none; de la modale
    modalGalery.style.display = "block";
});

addWorksButton.addEventListener("click", function(){
    modalGalery.style.display = "none";
    modalAdd.style.display = "block";
});

returnModalButton.addEventListener("click", function(){
    modalGalery.style.display = "block";
    modalAdd.style.display = "none";
});

//enlève modale
faXmarks.forEach(function(faXmark){
    faXmark.addEventListener("click", function(){
        console.log("Fermeture de la modale");
        modal.style.display = "none";
        addWorkModalInterface.style.display = "none";
        modalGalery.style.display = "none";
        modalAdd.style.display = "none";
    });
});

login.addEventListener("click", function() {
    if(sessionStorage.getItem("token")) {
        // Suppression de l'élément ayant la clé "myKey"
        console.log("Retrait du token dans le session storage");
        sessionStorage.removeItem("token");
        login.innerHTML = "login";
    }
});

{/* <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i> */}