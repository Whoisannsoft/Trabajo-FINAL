const search = document.getElementById("searchBar");
const urlParams = new URLSearchParams(window.location.search);
search.addEventListener("keyup", () => {
  setTimeout(() => {
    window.location.href = "Galeria.html" + "?search=" + search.value;
  }, 1000);
});

search.value = urlParams.get("search") || "";