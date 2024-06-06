const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const image = urlParams.get('image');
const description = urlParams.get('description');
window.document.getElementById("character-name").innerHTML = name;
window.document.getElementById("card-image").src = image;
window.document.getElementById("character-description").innerHTML = description;

const search = document.getElementById("searchBar");
search.addEventListener("keyup", () => {
  setTimeout(() => {
    window.location.href = "Galeria.html" + "?search=" + search.value;
  }, 1000);
});

search.value = urlParams.get("search") || "";