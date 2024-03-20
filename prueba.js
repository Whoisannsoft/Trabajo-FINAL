function toggleFavorito(star) {
    const favoritoSrc = "/imagenes Generales/estrellafav.png"; // Ruta de la imagen favorita
    const noFavoritoSrc = "/imagenes Generales/estrella.png"; // Ruta de la imagen no favorita
    star.src = star.src.includes(noFavoritoSrc) ? favoritoSrc : noFavoritoSrc;
  }
  