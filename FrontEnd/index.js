async function chargement(){
    const reponse = await fetch('http://localhost:5678/api/works');
    let photos = await reponse.json();

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