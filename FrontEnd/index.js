let photos;

async function chargement(){
    const reponse = await fetch('http://localhost:5678/api/works');
    photos = await reponse.json();
    console.log(photos);
    genererPhotos(photos);
}

chargement();

function genererPhotos(photos){
    for (let i = 0; i < photos.length; i++){
        const projet = photos[i];
        const sectionGallery = document.querySelector(".gallery");
        const photoElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const textElement = document.createElement("figcaption");
        textElement.innerText = projet.title;
        sectionGallery.appendChild(photoElement);
        photoElement.appendChild(imageElement);
        photoElement.appendChild(textElement);
    }
}

class Filtreur {
    constructor(nomClasse, filtre) {
        this.bouton = document.querySelector(nomClasse);
        this.filtre = filtre;
        this.bouton.addEventListener("click", () => {
            const photosFiltrees = photos.filter(this.filtre);
            document.querySelector(".gallery").innerHTML = "";
            genererPhotos(photosFiltrees);
        });
    }
}

function activationFiltreur(){
    const filtrerTous = new Filtreur(".tous", photo => photo.category.name !== null);
    const filtrerObjets = new Filtreur(".objets", photo => photo.category.name === 'Objets');
    const filtrerAppartements = new Filtreur(".appartements", photo => photo.category.name === 'Appartements');
    const filtrerHotels = new Filtreur(".hotels", photo => photo.category.name === 'Hotels & restaurants');
}

activationFiltreur();


