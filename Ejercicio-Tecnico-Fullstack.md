# 💻 Ejercicio Técnico Live Coding - Easy-Shop

## 📝 Información General

**Empresa:** Easy-Shop (E-commerce Analytics Platform)  
**Posición:** Desarrollador Fullstack  
**Duración:** 2-3 sesiones de 2-3 horas cada una (4-9 horas total)  
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
- **Base de datos:** SQLite (simple) o variables en memoria
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

**Credenciales API:**
```
Usuario: api_client
Password: SecurePass2024!
URL Token: https://pruebas-api-l4yu.onrender.com/api/auth/token
```

**2. 📥 Consumo de Órdenes**
- Obtener lista de órdenes desde la API externa
- Implementar paginación básica (página 1)
- Almacenar datos en memoria o variable simple

**API Órdenes:**
```
GET https://pruebas-api-l4yu.onrender.com/api/orders
Authorization: Bearer {token}
```

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

```
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
```

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
```bash
curl -X POST https://pruebas-api-l4yu.onrender.com/api/auth/token \
  -u api_client:SecurePass2024! \
  -H "Content-Type: application/json"
```

**Obtener Órdenes:**
```bash
curl -X GET "https://pruebas-api-l4yu.onrender.com/api/orders?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

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

*Este ejercicio simula el día a día en Easy-Shop: consumir APIs, mostrar datos y iterar rápido.*