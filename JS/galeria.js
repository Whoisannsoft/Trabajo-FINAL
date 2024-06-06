class Personaje {
  constructor(id, name, image, description, isFavorite) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.isFavorite = isFavorite;
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
    estrellaImg.src = this.isFavorite
      ? "/imagenes Generales/estrellafav (1).png"
      : "/imagenes Generales/estrellita.png";
    estrellaImg.alt = "Toggle favorite";
    estrellaImg.classList.add("estrella");
    estrellaImg.onclick = () => this.toggleFavorito(estrellaImg);

    nombreFavoritoDiv.appendChild(nombreLink);
    nombreFavoritoDiv.appendChild(estrellaImg);

    personajeDiv.appendChild(img);
    personajeDiv.appendChild(nombreFavoritoDiv);

    personajeDiv.addEventListener("click", () => {
      const personajetitulo = `

            <h1>${this.name}</h1>
            `;

      const personajeimg = `
                <img src="${this.image}" alt="${this.name}">
            `;
      const personajedes = `
                <p>${this.description}</p>
            `;

      window.location.href =
        "detallePersonaje.html" +
        "?name=" +
        this.name +
        "&image=" +
        this.image +
        "&description=" +
        this.description;
      const name = urlParams.get("name");
      console.log(name);
      window.document.getElementById("character-name").innerHTML = name;
      window.document.getElementById("card-image").innerHTML = personajeimg;
      window.document.getElementById("character-description").innerHTML =
        personajedes;
    });

    return personajeDiv;
  }

  toggleFavorito(estrellaImg) {
    let activeUser = sessionStorage.getItem("activeUser") || "defaultUser";
    let favorites =
      JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    if (favorites.some((fav) => fav.id === this.id)) {
      favorites = favorites.filter((fav) => fav.id !== this.id);
      estrellaImg.src = "/imagenes Generales/estrellita.png";
    } else {
      favorites.push({ id: this.id, name: this.name, image: this.image });
      estrellaImg.src = "/imagenes Generales/estrellafav (1).png";
    }
    localStorage.setItem(`favorites_${activeUser}`, JSON.stringify(favorites));
  }
}

const search = document.getElementById("searchBar");
const urlParams = new URLSearchParams(window.location.search);
search.addEventListener("keyup", () => {
  setTimeout(() => {
    window.location.href = "Galeria.html" + "?search=" + search.value;
  }, 1000);
});

search.value = urlParams.get("search") || "";


document.addEventListener("DOMContentLoaded", function () {
  const contenedorPersonajes = document.getElementById("contenedor-personajes");
  const seachFilter = urlParams.get("search") || "";

  fetch("https://retoolapi.dev/k6Flgn/hazbin_hotel")
    .then((response) => response.json())
    .then((jsonData) => {
      let activeUser = sessionStorage.getItem("activeUser") || "defaultUser";
      let favorites =
        JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
      jsonData.forEach((personajeJson) => {
        const isFavorite = favorites.some((fav) => fav.id === personajeJson.id);
        const personaje = new Personaje(
          personajeJson.id,
          personajeJson.name,
          personajeJson.image,
          personajeJson.description,
          isFavorite
        );
        const personajeHTML = personaje.createCharacterHTML();

        if (
          personajeJson.name.toLowerCase().includes(seachFilter.toLowerCase())
        ) {
          console.log(personajeJson.name);
          contenedorPersonajes.appendChild(personajeHTML);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});
