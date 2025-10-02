/**
 * Easy-Shop Portal - Documentación API
 * Maneja la funcionalidad de la documentación de la API
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!requireAuth()) return;
    
    // Inicializar funcionalidades
    initializeDocumentation();
});

/**
 * Inicializa todas las funcionalidades de la documentación
 */
function initializeDocumentation() {
    // Configurar tabs si existen
    setupTabs();
    
    // Configurar botones de copia
    setupCopyButtons();
    
    // Configurar navegación suave
    setupSmoothScrolling();
    
    // Configurar filtros de contenido
    setupContentFilters();
    
    // Actualizar ejemplos con credenciales del usuario
    updateExamplesWithUserCredentials();
}

/**
 * Configura el sistema de tabs
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            showTab(event, this.getAttribute('data-tab'));
        });
    });
}

/**
 * Muestra un tab específico
 */
function showTab(event, tabId) {
    // Remover clase active de todos los botones
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Ocultar todos los contenidos
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Agregar clase active al botón clickeado
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Mostrar el contenido correspondiente
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

/**
 * Configura los botones de copia de código
 */
function setupCopyButtons() {
    // Los botones de copia ya deberían estar en el HTML
    // Solo agregar funcionalidad si no existe
    const codeBlocks = document.querySelectorAll('.code-example .code');
    
    codeBlocks.forEach(codeBlock => {
        // Verificar si ya tiene botón de copia
        const existingButton = codeBlock.parentElement.querySelector('.copy-btn');
        if (existingButton) {
            // Agregar evento si no lo tiene
            if (!existingButton.hasAttribute('data-copy-initialized')) {
                existingButton.addEventListener('click', function() {
                    copyCode(this);
                });
                existingButton.setAttribute('data-copy-initialized', 'true');
            }
        }
    });
}

/**
 * Función para copiar código al clipboard
 */
function copyCode(button) {
    const codeBlock = button.nextElementSibling?.querySelector('.code') || 
                     button.parentElement.querySelector('.code');
    
    if (!codeBlock) {
        console.error('No se encontró el bloque de código');
        return;
    }
    
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        const originalText = button.textContent;
        const originalClass = button.className;
        
        button.textContent = '✓ Copiado!';
        button.className = button.className.replace('btn-outline-primary', 'btn-success');
        
        setTimeout(function() {
            button.textContent = originalText;
            button.className = originalClass;
        }, 2000);
    }).catch(function(err) {
        console.error('Error al copiar el código:', err);
        
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            button.textContent = '✓ Copiado!';
            setTimeout(() => {
                button.textContent = '📋 Copiar';
            }, 2000);
        } catch (fallbackErr) {
            console.error('Error en fallback de copia:', fallbackErr);
            alert('Error al copiar el código. Por favor, cópialo manualmente.');
        }
        
        document.body.removeChild(textArea);
    });
}

/**
 * Configura navegación suave para enlaces internos
 */
function setupSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular offset para el navbar fijo
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const elementPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                // Resaltar elemento brevemente
                highlightElement(targetElement);
            }
        });
    });
}

/**
 * Resalta un elemento brevemente
 */
function highlightElement(element) {
    element.style.backgroundColor = '#fff3cd';
    element.style.transition = 'background-color 0.3s ease';
    
    setTimeout(() => {
        element.style.backgroundColor = '';
    }, 2000);
}

/**
 * Configura filtros de contenido
 */
function setupContentFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            filterContent(filterValue);
            
            // Actualizar estado visual de los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Filtra contenido basado en el valor del filtro
 */
function filterContent(filterValue) {
    const filterableElements = document.querySelectorAll('[data-category]');
    
    filterableElements.forEach(element => {
        if (filterValue === 'all' || element.getAttribute('data-category') === filterValue) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Actualiza ejemplos con las credenciales del usuario actual
 */
function updateExamplesWithUserCredentials() {
    const username = sessionStorage.getItem('username');
    const credentials = sessionStorage.getItem('apiCredentials');
    const token = sessionStorage.getItem('authToken');
    
    if (username) {
        // Actualizar ejemplos que muestren el nombre de usuario
        const usernameElements = document.querySelectorAll('.example-username');
        usernameElements.forEach(el => {
            el.textContent = username;
        });
    }
    
    if (credentials) {
        // Actualizar ejemplos con credenciales codificadas
        const credentialElements = document.querySelectorAll('.example-credentials');
        credentialElements.forEach(el => {
            el.textContent = credentials;
        });
    }
    
    if (token) {
        // Actualizar ejemplos con token actual (solo primeros caracteres por seguridad)
        const tokenElements = document.querySelectorAll('.example-token');
        tokenElements.forEach(el => {
            el.textContent = token.substring(0, 20) + '...';
        });
    }
}

/**
 * Busca contenido en la documentación
 */
function searchDocumentation(query) {
    const searchQuery = query.toLowerCase().trim();
    
    if (!searchQuery) {
        // Mostrar todo el contenido si no hay búsqueda
        document.querySelectorAll('.searchable').forEach(el => {
            el.style.display = '';
        });
        return;
    }
    
    const searchableElements = document.querySelectorAll('.searchable');
    let hasResults = false;
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        
        if (text.includes(searchQuery)) {
            element.style.display = '';
            highlightSearchTerms(element, searchQuery);
            hasResults = true;
        } else {
            element.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    showSearchResults(hasResults, searchQuery);
}

/**
 * Resalta términos de búsqueda
 */
function highlightSearchTerms(element, query) {
    // Implementación básica de resaltado
    const regex = new RegExp(`(${query})`, 'gi');
    const originalHTML = element.innerHTML;
    
    // Solo resaltar si no contiene HTML complejo
    if (!originalHTML.includes('<script') && !originalHTML.includes('<style')) {
        element.innerHTML = originalHTML.replace(regex, '<mark>$1</mark>');
    }
}

/**
 * Muestra resultados de búsqueda
 */
function showSearchResults(hasResults, query) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (!hasResults) {
        resultsContainer.innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-search"></i>
                No se encontraron resultados para: <strong>${query}</strong>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = '';
    }
}