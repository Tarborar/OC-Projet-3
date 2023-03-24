const sectionGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filters = document.querySelector(".filtres");

let works;
let categories;
let filtersName;

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

   test();
}

function test(){
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
