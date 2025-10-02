/**
 * Easy-Shop Portal - Ejercicio Técnico
 * Página simple con indicaciones del ejercicio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!requireAuth()) return;
    
    // Solo configurar navegación básica
    setupNavigation();
});

/**
 * Configura la navegación básica
 */
function setupNavigation() {
    // Smooth scroll para enlaces internos
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}