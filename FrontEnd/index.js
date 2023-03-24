let works;
let categories;
let filtersName;
const sectionGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filters = document.querySelector(".filtres");

const errorMessage = `
    <p class="messageErreur">
        Il semblerait que les projets soient indisponibles pour le moment !
    </p>
`;

async function fetchWorks(){
    try{
        const response = await fetch('http://localhost:5678/api/works');
        works = await response.json();
        categories = works.map(work => work.category.name); // créé un tableau de tous les noms de catégories
        filtersName = categories.filter((category, current) => categories.indexOf(category) === current); //vérifie les doublons 
        loadingWorks(works);
        loadingFilters(filtersName);
    } catch (error){
        console.error("Une erreur est survenue:", error);
        portfolio.innerHTML = errorMessage; //affiche interface d'erreur
    }
}

fetchWorks();

function loadingWorks(works){
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

async function loadingFilters(filtersName){
    const ulFilter = document.createElement("ul");
    ulFilter.classList.add("rangeFiltre", "fontFiltre");
    filtersName.unshift("Tous");
    console.log(filtersName);
    
    for (let i=0; i < filtersName.length; i++){
        const liFilter = document.createElement("li");
        liFilter.innerText = filtersName[i];
        liFilter.classList.add ("boutonFiltre");

        ulFilter.appendChild(liFilter);

        /*
        <ul class="rangeFiltre fontFiltre">
            <li class="boutonFiltre filtreActive">Tous</li>
            <li class="boutonFiltre">Objets</li>
            <li class="boutonFiltre">Appartements</li>
            <li class="boutonFiltre">Hôtels & restaurants</li>
        </ul>
        */
    }
    ulFilter.children[0].classList.add("filtreActive"); //filtreActive sur le premier filtre "Tous"
    filters.prepend(ulFilter);

    const filterButtons = document.querySelectorAll(".boutonFiltre"); //ici parce que la class boutonFiltre n'existe pas encore
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.innerText;
            console.log(button.innerText);
            let filteredWorks;

            filterButtons.forEach(b => b.classList.remove("filtreActive"));
            button.classList.add("filtreActive");

            if (filterValue === "Tous"){
                filteredWorks = works;
            } else{
                filteredWorks = works.filter(work => work.category.name === filterValue);
            }

            sectionGallery.innerHTML = "";
            loadingWorks(filteredWorks);
            
        });
    });    
}