/*
<div class="personaje">
<img src="/personajes para galeria/alastor.png" alt="Personaje 1">
<div class="nombre-favorito">
<a>Alastor</a>
<img src="/imagenes Generales/estrella.png" alt="No favorito" class="estrella" onclick="toggleFavorito(this)">
</div>
</div>
*/

class Personaje {
    constructor(id, name, image, description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
    }

    createCharacterHTML() {
        const personajeDiv = document.createElement("div");
        personajeDiv.classList.add("personaje");
    
        const img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;
    
        const nombreFavoritoDiv = document.createElement("div");
        nombreFavoritoDiv.classList.add("nombre-favorito");
    
        const nombreLink = document.createElement("a");
        nombreLink.textContent = this.name;
    
        const estrellaImg = document.createElement("img");
        estrellaImg.src = "/imagenes Generales/estrella.png";
        estrellaImg.alt = "No favorito";
        estrellaImg.classList.add("estrella");
        estrellaImg.onclick = function() {
            toggleFavorito(this);
        };
    
        nombreFavoritoDiv.appendChild(nombreLink);
        nombreFavoritoDiv.appendChild(estrellaImg);
    
        personajeDiv.appendChild(img);
        personajeDiv.appendChild(nombreFavoritoDiv);
    
        return personajeDiv;
    }
}



const contenedorPersonajes = document.getElementById("contenedor-personajes");
var personajes = []
fetch('/JS/Personajes.json').then(response => {
    return response.json();
})
.then(jsonData => {
    for (const personajeJson of jsonData) {
        const personaje = new Personaje(personajeJson.id, personajeJson.name, personajeJson.image, personajeJson.description);
        personajes.push(personaje)
        const personajeHTML = personaje.createCharacterHTML();
        console.log(personajeHTML)
        contenedorPersonajes.appendChild(personajeHTML);
    }
})
.catch(error => {
    console.error('Error fetching JSON:', error);
});

