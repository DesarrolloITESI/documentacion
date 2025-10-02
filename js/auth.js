/**
 * Easy-Shop Portal - Autenticación Común
 * Funciones de autenticación compartidas entre páginas
 */

/**
 * Verifica autenticación básica - usar en páginas protegidas
 */
function requireAuth() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

/**
 * Cierra sesión - función global
 */
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('apiCredentials');
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    }
}

/**
 * Obtiene el token actual
 */
function getAuthToken() {
    return sessionStorage.getItem('authToken');
}

/**
 * Obtiene las credenciales codificadas
 */
function getApiCredentials() {
    return sessionStorage.getItem('apiCredentials');
}

/**
 * Verifica si el token sigue siendo válido haciendo una petición de prueba
 */
async function validateToken(token = null) {
    const authToken = token || getAuthToken();
    
    if (!authToken) return false;
    
    try {
        const response = await fetch('https://pruebas-api-l4yu.onrender.com/api/orders?limit=1', {
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error validando token:', error);
        return false;
    }
}