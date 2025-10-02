/**
 * Easy-Shop Portal - Ejercicio Técnico
 * Maneja la carga y visualización del ejercicio desde markdown
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!requireAuth()) return;
    
    // Cargar el ejercicio
    loadExercise();
    
    // Configurar navegación
    setupNavigation();
});

/**
 * Carga el archivo markdown del ejercicio y lo convierte a HTML
 */
async function loadExercise() {
    const contentElement = document.getElementById('exerciseContent');
    
    if (!contentElement) {
        console.error('Elemento exerciseContent no encontrado');
        return;
    }
    
    try {
        showLoadingContent(contentElement);
        
        // Intentar diferentes rutas para el archivo
        const possiblePaths = [
            'Ejercicio-Tecnico-Fullstack.md',
            './Ejercicio-Tecnico-Fullstack.md'
        ];
        
        let markdownText = null;
        let loadedPath = null;
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    markdownText = await response.text();
                    loadedPath = path;
                    break;
                }
            } catch (error) {
                console.log(`No se pudo cargar desde: ${path}`);
            }
        }
        
        if (!markdownText) {
            throw new Error('No se pudo encontrar el archivo del ejercicio');
        }
        
        console.log(`Archivo cargado desde: ${loadedPath}`);
        
        // Verificar si el contenido no está vacío
        if (!markdownText.trim()) {
            throw new Error('El archivo está vacío');
        }
        
        // Verificar si marked está disponible
        if (typeof marked === 'undefined') {
            console.warn('Marked.js no está disponible, usando fallback');
            showMarkdownFallback(contentElement, markdownText);
        } else {
            // Convertir markdown a HTML usando marked
            try {
                const htmlContent = marked.parse(markdownText);
                contentElement.innerHTML = htmlContent;
                
                // Resaltar código si Prism está disponible
                if (typeof Prism !== 'undefined') {
                    setTimeout(() => Prism.highlightAll(), 100);
                }
                
                // Agregar funcionalidad extra
                enhanceContent(contentElement);
                
            } catch (markedError) {
                console.error('Error procesando markdown:', markedError);
                showMarkdownFallback(contentElement, markdownText);
            }
        }
        
    } catch (error) {
        console.error('Error al cargar el ejercicio:', error);
        showErrorContent(contentElement, error);
    }
}

/**
 * Muestra contenido de loading
 */
function showLoadingContent(element) {
    element.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3 text-muted">Cargando ejercicio técnico...</p>
        </div>
    `;
}

/**
 * Muestra contenido de error
 */
function showErrorContent(element, error) {
    element.innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Error al cargar el ejercicio técnico</strong>
            <p class="mb-0 mt-2">Por favor, intenta nuevamente o contacta al administrador.</p>
            <small class="text-muted">Error: ${error.message}</small>
            <div class="mt-3">
                <button class="btn btn-outline-danger" onclick="loadExercise()">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        </div>
    `;
}

/**
 * Fallback para mostrar markdown sin procesar
 */
function showMarkdownFallback(element, markdownText) {
    // Aplicar formato básico sin librerías externas
    let htmlContent = markdownText
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        .replace(/\n/gim, '<br>');
    
    element.innerHTML = `
        <div class="alert alert-info">
            <i class="fas fa-info-circle"></i>
            <strong>Modo de compatibilidad:</strong> Mostrando contenido con formato básico.
        </div>
        <div class="markdown-fallback">${htmlContent}</div>
    `;
}

/**
 * Mejora el contenido con funcionalidades adicionales
 */
function enhanceContent(element) {
    // Agregar botones de copia para bloques de código
    addCopyButtons(element);
    
    // Hacer enlaces externos seguros
    makeExternalLinksSafe(element);
}

/**
 * Agrega botones de copia para bloques de código
 */
function addCopyButtons(element) {
    const codeBlocks = element.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-secondary position-absolute';
        copyButton.style.cssText = 'top: 0.5rem; right: 0.5rem;';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copiar código';
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    copyButton.classList.replace('btn-outline-secondary', 'btn-success');
                    
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                        copyButton.classList.replace('btn-success', 'btn-outline-secondary');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error copiando código:', err);
                });
        });
        
        const preElement = codeBlock.parentElement;
        preElement.style.position = 'relative';
        preElement.appendChild(copyButton);
    });
}

/**
 * Hace que los enlaces externos sean seguros
 */
function makeExternalLinksSafe(element) {
    const links = element.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Agregar icono de enlace externo
        if (!link.innerHTML.includes('fa-external-link')) {
            link.innerHTML += ' <i class="fas fa-external-link-alt fa-sm"></i>';
        }
    });
}

/**
 * Configura la navegación
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