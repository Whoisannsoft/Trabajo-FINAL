const favoritesContainer = document.getElementById("contenedor-personajes");
getFavoriteCharactersHTML();
function getFavoriteCharactersHTML() {
    let activeUser = sessionStorage.getItem('activeUser');
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    if (favorites.length === 0) {
        const noFavorites = document.createElement("h2");
        noFavorites.textContent = "No tienes personajes favoritos";
        favoritesContainer.appendChild(noFavorites);
    }    
    favorites.forEach(favorite => {
        const personajeDiv = document.createElement("div");
        personajeDiv.classList.add("personaje");
        const img = document.createElement("img");
        img.src = favorite.image;
        img.alt = favorite.name;

        const nombreFavoritoDiv = document.createElement("div");
        nombreFavoritoDiv.classList.add("nombre-favorito");
        const nombreLink = document.createElement("a");
        nombreLink.textContent = favorite.name;

        const estrellaImg = document.createElement("img");
        estrellaImg.src = "/imagenes Generales/estrellafav (1).png";
        estrellaImg.alt = "Toggle favorite";
        estrellaImg.classList.add("estrella");
        estrellaImg.onclick = (event) => toggleFavorito(estrellaImg, event);

        function toggleFavorito(estrellaImg, event) {
            event.stopPropagation();
            let activeUser = sessionStorage.getItem('activeUser') ;
            let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
            if (favorites.some(fav => fav.id === favorite.id)) {
                favorites = favorites.filter(fav => fav.id !== favorite.id);
                estrellaImg.src = "/imagenes Generales/estrellita.png";
            }
            localStorage.setItem(`favorites_${activeUser}`, JSON.stringify(favorites));
            location.reload();
        }

        nombreFavoritoDiv.appendChild(nombreLink);
        nombreFavoritoDiv.appendChild(estrellaImg);

        personajeDiv.appendChild(img);
        personajeDiv.appendChild(nombreFavoritoDiv);

        personajeDiv.addEventListener('click', () => {
            const personajeInfo = `
                <h1>${this.name}</h1>
                <img src="${this.image}" alt="${this.name}">
                <p>${this.description}</p>
            `;
            const ventana = window.open('', '_blank');
            ventana.document.write(personajeInfo);
            ventana.document.close();
        });
        favoritesContainer.appendChild(personajeDiv);
    });
    
    
}
