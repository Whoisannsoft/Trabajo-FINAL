const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const image = urlParams.get('image');
const description = urlParams.get('description');
window.document.getElementById("character-name").innerHTML = name;
window.document.getElementById("card-image").src = image;
window.document.getElementById("character-description").innerHTML = description;
