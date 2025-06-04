document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    const dashboard = document.getElementById('dashboard');
    const usernameDisplay = document.getElementById('username-display');

    
    if (localStorage.getItem('loggedInUser')) {
        showDashboard(localStorage.getItem('loggedInUser'));
    }

    showRegister.addEventListener('click', showRegisterForm);
    showLogin.addEventListener('click', showLoginForm);
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    forgotPasswordLink.addEventListener('click', handleForgotPassword);

    function showRegisterForm(e) {
        e.preventDefault();
        loginFormContainer.classList.add('hidden');
        registerFormContainer.classList.remove('hidden');
        registerError.textContent = '';
    }

    function showLoginForm(e) {
        e.preventDefault();
        registerFormContainer.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
        loginError.textContent = '';
    }

    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = "dashboard.html"; 
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(u => u.username === username)) {
            registerError.textContent = 'Username already exists';
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        registerForm.reset();
        registerError.textContent = '';
        showLoginForm(e);
    }

    function handleForgotPassword(e) {
        e.preventDefault();

        const username = prompt("Enter your username:");
        if (!username) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);

        if (!user) {
            alert("Username not found.");
            return;
        }

        const newPassword = prompt("Enter your new password:");
        if (!newPassword) return;

        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        alert("Password reset successful. You can now login with the new password.");
    }

    function showDashboard(username) {
        loginFormContainer.classList.add('hidden');
        registerFormContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');
        usernameDisplay.textContent = username;
    }
});
