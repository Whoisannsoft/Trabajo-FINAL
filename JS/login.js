document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        
        const username = document.getElementById('username').value;  
        const password = document.getElementById('password').value;

        
        let isAuthenticated = false;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('user_')) {
                const user = JSON.parse(localStorage.getItem(key));
                if ((user.email === username || user.username === username) && user.password === password) {
                    
                    sessionStorage.setItem('activeUser', JSON.stringify(user));
                    isAuthenticated = true;
                    break;
                }
            }
        }

        if (isAuthenticated) {
            
            window.location.href = 'main.html';
        } else {
            
            alert('Email o contraseña incorrectos.');
        }
    });
});
