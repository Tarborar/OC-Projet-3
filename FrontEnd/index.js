let works;
const sectionGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");

const errorMessage = `
    <p class="messageErreur">
        Il semblerait que les projets soient indisponibles pour le moment !
    </p>
`

async function fetchWorks(){
    try{
        const response = await fetch('http://localhost:5678/api/works');
        works = await response.json();
        console.log("appel du fetch pour récupérer toutes les works");
        loadingWorks(works);
    } catch (error){
        console.error("Une erreur est survenue:", error);
        portfolio.innerHTML = errorMessage;
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
    }
}

class Filter {
    constructor(className, filter){
        this.button = document.querySelector(className);
        this.filter = filter;
        this.button.addEventListener("click", async () => {
            await fetchWorks();
            const filteredWorks = works.filter(this.filter);
            sectionGallery.innerHTML = "";
            loadingWorks(filteredWorks); 
            console.log(filteredWorks);
        });
    }
}



const filterTous = new Filter(".tous", photo => photo.category.name !== null);
const filterObjets = new Filter(".objets", photo => photo.category.name === 'Objets');
const filterAppartements = new Filter(".appartements", photo => photo.category.name === 'Appartements');
const filterHotels = new Filter(".hotels", photo => photo.category.name === 'Hotels & restaurants');





