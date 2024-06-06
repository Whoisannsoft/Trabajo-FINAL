const nombreInput = document.getElementById('nombreCompleto');
const emailInput = document.getElementById('correoElectronico');
const passwordInput = document.getElementById('contrasena');    
// Cargar información del usuario activo
const activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
console.log(activeUser);


if (activeUser) {
    nombreInput.value = activeUser.username || '';
    emailInput.value = activeUser.email || '';
    passwordInput.value = activeUser.password || ''; 

    nombreInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
} else {
    console.error('No hay un usuario activo. Por favor inicie sesión.');
}

const btnEditar = document.getElementById('btnEditar');
const btnConfirmar = document.getElementById('btnConfirmar'); 
const logoutButton = document.getElementById('btnsalir');  

btnEditar.addEventListener('click', function() {
    nombreInput.disabled = false;
    emailInput.disabled = false;
    passwordInput.disabled = false;
});

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', function(e) {
        e.preventDefault();
        
        const updatedUser = {
            ...activeUser,
            username: nombreInput.value,
            email: emailInput.value,
            password: passwordInput.value 
        };
        localStorage.setItem('user_' + updatedUser.username, JSON.stringify(updatedUser));
        sessionStorage.setItem('activeUser', JSON.stringify(updatedUser));
        
        nombreInput.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;
    });
}


if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        if (sessionStorage.getItem('activeUser')) {
            sessionStorage.removeItem('activeUser');
            window.location.href = 'login.html';
        } else {
            console.error('No se puede cerrar sesión sin un usuario activo.');
        }
    });
} else {
    console.error('El botón de cerrar sesión no se encontró en la página.');
}

const search = document.getElementById("searchBar");
const urlParams = new URLSearchParams(window.location.search);
search.addEventListener("keyup", () => {
  setTimeout(() => {
    window.location.href = "Galeria.html" + "?search=" + search.value;
  }, 1000);
});

search.value = urlParams.get("search") || "";