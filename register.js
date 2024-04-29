document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();  

        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        if (!username || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        
        const user = {
            username: username,
            email: email,
            password: password  
        };

        
        localStorage.setItem('user_' + username, JSON.stringify(user));

        
        window.location.href = 'main.html'; 
    });
});
