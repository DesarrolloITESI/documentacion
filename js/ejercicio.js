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
 * Contenido del ejercicio técnico como fallback
 */
const EXERCISE_CONTENT = `# 💻 Ejercicio Técnico Live Coding - Easy-Shop

## 📝 Información General

**Empresa:** Easy-Shop (E-commerce Analytics Platform)  
**Posición:** Desarrollador Fullstack  
**Modalidad:** Live Coding - Evaluación en tiempo real  

---

## 🎯 Objetivo

Desarrollar una aplicación web básica que consuma nuestra API de órdenes y muestre los datos de manera simple. **La evaluación se centra en el proceso de desarrollo, no en el resultado final.**

### ¿Qué Evaluamos?

- 🤔 **Pensamiento lógico:** Cómo abordas los problemas
- 💻 **Habilidades de programación:** Sintaxis, estructura de código
- 🔍 **Debugging:** Cómo identificas y resuelves errores
- 📚 **Uso de documentación:** Cómo consultas recursos externos
- 💬 **Comunicación:** Explicación del código mientras desarrollas

---

## 🛠️ Stack Tecnológico Sugerido

### Backend
- **Lenguaje:** Python (Flask/FastAPI) | Node.js (Express) | PHP
- **Base de datos:** Solo bases relacionales (PostgreSQL recomendado), también puedes usar MySQL o SQLite para pruebas simples
- **HTTP Client:** requests/axios/curl

### Frontend  
- **Base:** HTML + CSS + JavaScript vanilla
- **Framework:** React/Vue (si prefieres y conoces)
- **CSS:** Bootstrap/Tailwind (opcional para estilos rápidos)
- **Gráficos:** Chart.js (fácil implementación)

---

## ⚙️ Funcionalidades por Sesión

### 🚀 Sesión 1: Backend y API (2-3 horas)

**1. 🎯 Autenticación Básica**
- Obtener token de la API usando credenciales básicas
- Crear endpoint simple para autenticación
- Manejar respuestas de error básicas

**2. 📥 Consumo de Órdenes**
- Obtener lista de órdenes desde la API externa
- Implementar paginación básica (página 1)
- Almacenar datos en memoria o variable simple

**API Órdenes:**
\`\`\`
GET https://pruebas-api-l4yu.onrender.com/api/orders
Authorization: Bearer {token}
\`\`\`

### 🎨 Sesión 2: Frontend Básico (2-3 horas)

**3. 🖥️ Interfaz Simple**
- Formulario de "login" básico (solo visual)
- Tabla HTML para mostrar órdenes
- Mostrar: ID, Email, Total, Plataforma, Fecha
- Botón "Cargar Datos" que consulte el backend

**4. 🔄 Conexión Frontend-Backend**
- JavaScript para hacer peticiones al backend
- Mostrar datos en la tabla dinámicamente
- Manejo básico de estados de carga

### ✨ Sesión 3: Funcionalidades Extra (2-3 horas) [Opcional]

**5. 🔍 Filtros Básicos**
- Dropdown para filtrar por plataforma
- Campo de búsqueda por email/ID
- Aplicar filtros en frontend (datos ya cargados)

**6. 📊 Visualización Simple**
- **Opción A:** Tabla con totales por plataforma
- **Opción B:** Gráfico básico de barras (Chart.js)
- Mostrar: Amazon: $X, eBay: $Y, Etsy: $Z

---

## 📁 Estructura de Proyecto Esperada

\`\`\`
mi-ejercicio/
├── backend/
│   ├── app.py (o server.js)
│   ├── requirements.txt (o package.json)
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
└── README.md (principal)
\`\`\`

---

## 🧪 Criterios de Evaluación Live Coding

### Proceso de Desarrollo (40%)
- ✅ **Planificación:** Explicas qué vas a hacer antes de hacerlo
- ✅ **Iteración:** Desarrollas paso a paso, probando frecuentemente  
- ✅ **Debugging:** Identificas errores y los corriges metódicamente
- ✅ **Comunicación:** Explicas tu razonamiento mientras programas

### Habilidades Técnicas (35%)
- ✅ **Código funcional:** Lo básico debe funcionar
- ✅ **Sintaxis correcta:** Conocimiento del lenguaje elegido
- ✅ **Estructura:** Organización lógica del código
- ✅ **Uso de herramientas:** Console, debugger, documentación

### Resolución de Problemas (25%)
- ✅ **Análisis:** Entiendes los requisitos correctamente
- ✅ **Adaptación:** Te ajustas cuando algo no funciona
- ✅ **Recursos:** Sabes dónde buscar ayuda
- ✅ **Persistencia:** No te rindes ante errores

---

## 📚 Recursos de Apoyo

### Documentación API
**📖 Completa:** https://desarrolloitesi.github.io/documentacion/

### Ejemplos de Uso
**Obtener Token:**
\`\`\`bash
curl -X POST https://pruebas-api-l4yu.onrender.com/api/auth/token \\
  -u api_client:SecurePass2024! \\
  -H "Content-Type: application/json"
\`\`\`

**Obtener Órdenes:**
\`\`\`bash
curl -X GET "https://pruebas-api-l4yu.onrender.com/api/orders?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

### Herramientas Útiles
- **📊 Chart.js:** https://www.chartjs.org/docs/latest/getting-started/
- **🎨 Bootstrap:** https://getbootstrap.com/docs/5.0/getting-started/introduction/
- **📖 MDN Web Docs:** https://developer.mozilla.org/

---

## ⏰ Timeline de Referencia

| Tiempo | Actividad Sugerida |
|--------|--------------------|
| **0-30 min** | Setup proyecto, entender API, primer token |
| **30-90 min** | Backend básico: endpoint auth + obtener órdenes |
| **90-120 min** | Testing backend, ajustes, documentar |
| **120-150 min** | Frontend: HTML básico + tabla |
| **150-210 min** | JavaScript: conectar con backend |
| **210-240 min** | Refinamientos, testing, demo |

---

## 🏆 Consejos para el Éxito

### Antes de Empezar
1. **📖 Lee la documentación** de la API rápidamente
2. **🧪 Prueba manualmente** con curl o Postman
3. **📝 Planifica** los pasos en papel/comentarios

### Durante el Desarrollo
4. **🔄 Itera pequeño:** Haz que funcione básico primero
5. **🗣️ Habla mientras programas:** Explica tu proceso  
6. **🧪 Prueba frecuentemente:** Cada función nueva = test inmediato
7. **❓ Pregunta si no entiendes** algo de los requisitos

### Si Te Atascas
8. **🐛 Console.log/print es tu amigo** para debugging
9. **📚 Usa Google/StackOverflow** libremente 
10. **🤝 Comunica el problema** - te ayudaremos a desbloquearte

---

## 🎯 Mínimo Funcional

**Al final, debe funcionar:**
- ✅ Obtener token de la API
- ✅ Obtener al menos 10 órdenes  
- ✅ Mostrarlas en una tabla HTML
- ✅ Explicar cómo funciona tu código

**Si hay tiempo extra:**
- ⭐ Filtro por plataforma
- ⭐ Búsqueda básica
- ⭐ Un gráfico simple
- ⭐ Estilos CSS básicos

---

**¡No te preocupes por la perfección! Lo importante es ver cómo piensas y resuelves problemas. 🚀**

*Este ejercicio simula el día a día en Easy-Shop: consumir APIs, mostrar datos y iterar rápido.*`;

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
        
        let markdownText = null;
        
        // Intentar cargar desde archivo si estamos en un servidor
        try {
            const response = await fetch('Ejercicio-Tecnico-Fullstack.md');
            if (response.ok) {
                markdownText = await response.text();
                console.log('Archivo cargado desde servidor');
            }
        } catch (error) {
            console.log('No se pudo cargar desde servidor, usando contenido incrustado');
        }
        
        // Si no se pudo cargar desde archivo, usar contenido incrustado
        if (!markdownText || !markdownText.trim()) {
            markdownText = EXERCISE_CONTENT;
            console.log('Usando contenido incrustado');
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