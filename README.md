# Easy-Shop Portal - Estructura de Archivos

## 📁 Organización del Proyecto

```
docs/
├── index.html              # Página principal (login)
├── menu.html               # Menú principal después del login
├── ejercicio.html          # Página del ejercicio técnico
├── documentacion.html      # Documentación completa de la API
├── estructura.html         # Diagrama de la estructura (referencia)
├── css/
│   └── portal.css         # Estilos globales del portal
├── js/
│   ├── auth.js            # Funciones de autenticación comunes
│   ├── login.js           # Lógica de la página de login
│   ├── menu.js            # Lógica del menú principal
│   ├── ejercicio.js       # Lógica de la página de ejercicio
│   └── documentacion.js   # Lógica de la documentación
├── Ejercicio-Tecnico-Fullstack.md  # Contenido del ejercicio
├── API-Documentation.md             # Documentación en markdown
└── postman-collection.json         # Colección de Postman
```

## 🔧 Arquitectura de JavaScript

### Separación de Responsabilidades

**`auth.js`** - Funciones de autenticación compartidas:
- `requireAuth()` - Verificación básica de autenticación
- `logout()` - Función global de cierre de sesión
- `getAuthToken()` - Obtener token actual
- `validateToken()` - Validar token con la API
- `autoRenewToken()` - Renovación automática de tokens

**`login.js`** - Página de inicio de sesión:
- Manejo del formulario de login
- Validación con la API
- Estados de loading y error
- Redirección automática si ya está logueado

**`menu.js`** - Menú principal:
- Verificación de autenticación
- Estado del token en tiempo real
- Renovación de tokens expirados
- Información del usuario

**`ejercicio.js`** - Página del ejercicio:
- Carga del archivo markdown
- Conversión a HTML con marked.js
- Resaltado de código con Prism.js
- Funcionalidades extra (índice, copia de código)

**`documentacion.js`** - Documentación de la API:
- Sistema de tabs
- Botones de copia de código
- Navegación suave
- Filtros de contenido
- Búsqueda en la documentación

## 🚀 Flujo de Funcionamiento

### 1. Autenticación
1. Usuario accede a `index.html`
2. `login.js` verifica si ya está logueado
3. Si no, muestra formulario de login
4. Valida credenciales con la API
5. Guarda token en sessionStorage
6. Redirige a `menu.html`

### 2. Navegación
1. Todas las páginas cargan `auth.js` primero
2. `requireAuth()` verifica autenticación
3. Si no está autenticado, redirige a login
4. Si está autenticado, carga funcionalidades específicas

### 3. Renovación Automática
1. `auth.js` configura renovación cada 25 minutos
2. Los tokens duran 30 minutos
3. Se renueva automáticamente usando credenciales almacenadas
4. Si falla, redirige al login

## 🔐 Seguridad

### Almacenamiento
- **Token JWT**: `sessionStorage.authToken`
- **Credenciales**: `sessionStorage.apiCredentials` (Base64)
- **Usuario**: `sessionStorage.username`

### Validación
- Verificación en cada carga de página
- Tokens con expiración de 30 minutos
- Limpieza automática si el token es inválido
- Renovación proactiva antes de expirar

## 🛠️ Funcionalidades Implementadas

### Autenticación
- ✅ Login con credenciales de API
- ✅ Verificación de tokens
- ✅ Renovación automática
- ✅ Logout seguro
- ✅ Redirección automática

### UI/UX
- ✅ Estados de loading
- ✅ Manejo de errores
- ✅ Notificaciones de éxito
- ✅ Navegación intuitiva
- ✅ Diseño responsive

### Documentación
- ✅ Carga de markdown dinámico
- ✅ Resaltado de código
- ✅ Copia de código con un click
- ✅ Navegación suave
- ✅ Índice de contenidos automático

### API Integration
- ✅ Consumo de endpoints de autenticación
- ✅ Validación de tokens en tiempo real
- ✅ Manejo de errores de API
- ✅ Ejemplos actualizados con credenciales del usuario

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Características ES6+ Utilizadas
- `async/await`
- `fetch API`
- `sessionStorage`
- `arrow functions`
- `template literals`
- `destructuring`

## 🔄 Mantenimiento

### Agregar Nueva Página
1. Crear archivo HTML en la raíz
2. Crear archivo JS correspondiente en `/js/`
3. Importar `auth.js` y llamar `requireAuth()`
4. Agregar navegación en el menú

### Modificar Autenticación
- Editar `auth.js` para cambios globales
- Los cambios se propagan automáticamente

### Actualizar Estilos
- Editar `css/portal.css` para estilos globales
- Usar variables CSS definidas en `:root`

## 📊 Métricas de Performance

### Carga de Páginas
- **index.html**: ~150KB (incluye Bootstrap + FontAwesome)
- **menu.html**: ~180KB
- **ejercicio.html**: ~200KB (incluye Prism + Marked)
- **documentacion.html**: ~250KB (contenido extenso)

### JavaScript
- **auth.js**: ~3KB
- **login.js**: ~4KB
- **menu.js**: ~5KB
- **ejercicio.js**: ~6KB
- **documentacion.js**: ~8KB

**Total JS personalizado**: ~26KB (sin comprimir)

## 🚀 Próximas Mejoras

- [ ] Service Worker para funcionamiento offline
- [ ] Caching inteligente de tokens
- [ ] Tema oscuro/claro
- [ ] Búsqueda global en toda la documentación
- [ ] Exportación de documentación a PDF
- [ ] Analytics de uso
- [ ] Compresión y minificación de assets