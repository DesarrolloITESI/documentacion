/**
 * Easy-Shop Portal - Login
 * Maneja la autenticación de usuarios con la API
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Verificar si ya está logueado
    checkExistingAuth();
});

/**
 * Maneja el proceso de login
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.querySelector('.btn-login');
    const loginText = document.querySelector('.login-text');
    const loading = document.querySelector('.loading');
    const errorAlert = document.getElementById('errorAlert');
    
    // Mostrar loading
    showLoadingState(loginText, loading, submitBtn, errorAlert);
    
    try {
        // Llamar a la API para validar credenciales
        const response = await fetch('https://pruebas-api-l4yu.onrender.com/api/auth/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            // Guardar token y credenciales en sessionStorage
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('apiCredentials', btoa(username + ':' + password));
            sessionStorage.setItem('username', username);
            
            // Mostrar éxito brevemente antes de redirigir
            showSuccessState(loginText, loading);
            
            // Redirigir al menú principal
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 1000);
        } else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        showErrorState(errorAlert, error.message);
    } finally {
        // Restaurar estado del botón después de un tiempo
        setTimeout(() => {
            hideLoadingState(loginText, loading, submitBtn);
        }, 2000);
    }
}

/**
 * Muestra el estado de loading
 */
function showLoadingState(loginText, loading, submitBtn, errorAlert) {
    loginText.style.display = 'none';
    loading.style.display = 'inline';
    submitBtn.disabled = true;
    errorAlert.style.display = 'none';
}

/**
 * Oculta el estado de loading
 */
function hideLoadingState(loginText, loading, submitBtn) {
    loginText.style.display = 'inline';
    loading.style.display = 'none';
    submitBtn.disabled = false;
}

/**
 * Muestra estado de éxito
 */
function showSuccessState(loginText, loading) {
    loading.innerHTML = '<i class="fas fa-check"></i> ¡Acceso correcto!';
    loading.style.color = '#28a745';
}

/**
 * Muestra estado de error
 */
function showErrorState(errorAlert, message) {
    errorAlert.style.display = 'block';
    document.getElementById('errorMessage').textContent = 
        'Error: ' + (message || 'Credenciales incorrectas o problema de conexión');
}

/**
 * Verifica si ya existe una autenticación válida
 */
function checkExistingAuth() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        // Verificar si el token sigue siendo válido
        fetch('https://pruebas-api-l4yu.onrender.com/api/orders?limit=1', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.ok) {
                // Token válido, redirigir al menú
                window.location.href = 'menu.html';
            }
        })
        .catch(error => {
            console.log('Token expirado o inválido');
            // Limpiar storage si el token no es válido
            sessionStorage.clear();
        });
    }
}