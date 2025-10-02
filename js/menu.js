/**
 * Easy-Shop Portal - Menu Principal
 * Maneja la navegación y estado del usuario
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación al cargar
    checkAuthentication();
    
    // Configurar eventos
    setupEventListeners();
});

/**
 * Verifica si el usuario está autenticado
 */
function checkAuthentication() {
    const token = sessionStorage.getItem('authToken');
    const credentials = sessionStorage.getItem('apiCredentials');
    
    if (!token || !credentials) {
        redirectToLogin();
        return false;
    }
    
    // Mostrar información del usuario si está disponible
    displayUserInfo();
    return true;
}

/**
 * Muestra información del usuario
 */
function displayUserInfo() {
    const username = sessionStorage.getItem('username');
    const userInfoElement = document.getElementById('userInfo');
    
    if (username && userInfoElement) {
        userInfoElement.textContent = `Conectado como: ${username}`;
    }
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    // Evento para el botón de logout (si existe)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar almacenamiento
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('apiCredentials');
        sessionStorage.removeItem('username');
        
        // Redirigir al login
        redirectToLogin();
    }
}

/**
 * Redirige al login
 */
function redirectToLogin() {
    window.location.href = 'index.html';
}

/**
 * Utilidad para mostrar notificaciones
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i> ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}