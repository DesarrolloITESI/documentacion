# 🛒 API Ecommerce - Documentación Completa

**Versión:** 1.0.0 | **Fecha:** Octubre 2025 | **Protocolo:** REST API

## 🌐 URLs del API

- **🚀 Producción:** `https://pruebas-api-l4yu.onrender.com/api`
- **🛠️ Desarrollo:** `https://pruebas-api-l4yu.onrender.com/api`

---

## 📋 Tabla de Contenido

1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Autenticación](#autenticación)
4. [Endpoints de Órdenes](#endpoints-de-órdenes)
5. [Endpoints de Productos](#endpoints-de-productos)
6. [Filtros y Parámetros](#filtros-y-parámetros)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Manejo de Errores](#manejo-de-errores)
9. [Herramientas de Prueba](#herramientas-de-prueba)

---

## 1. 📖 Introducción

La **API Ecommerce** es una interfaz RESTful diseñada para gestionar órdenes y productos en plataformas de comercio electrónico. Proporciona funcionalidades completas para:

- 🔐 **Autenticación segura** con tokens JWT
- 📦 **Gestión de órdenes** con filtros avanzados
- 🛍️ **Administración de productos** por SKU
- 📊 **Exportación de datos** a diferentes formatos
- 🔒 **Seguridad integrada** con rate limiting

### Información Básica
- **🌐 URL Base:** `https://pruebas-api-l4yu.onrender.com/api`
- **📋 Formato:** JSON
- **🔑 Autenticación:** Bearer Token (JWT)
- **⏱️ Rate Limit:** 1 petición por segundo por IP

---

## 2. ⚙️ Configuración Inicial

### 📋 Requisitos Previos
- Servidor API ejecutándose en `http://localhost:3000`
- Herramienta para hacer peticiones HTTP (curl, Postman, etc.)
- Token de autenticación válido

### 🔧 Headers Requeridos

| Header | Valor | Descripción |
|--------|-------|-------------|
| `Content-Type` | application/json | Para peticiones con body (POST, PUT) |
| `Authorization` | Bearer {token} | Token JWT para endpoints protegidos |

---

## 3. 🔐 Autenticación

La API utiliza **JSON Web Tokens (JWT)** para autenticación. Los tokens tienen una duración de **30 minutos** y deben incluirse en el header Authorization de todas las peticiones protegidas.

### 🔑 Obtener Token de Acceso

**Endpoint:** `POST /api/auth/token`

**Descripción:** Genera un nuevo token de acceso JWT válido por 30 minutos.

**Petición:**
```bash
curl -X POST https://pruebas-api-l4yu.onrender.com/api/auth/token
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Token de acceso generado exitosamente",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 1800,
    "expires_at": "2025-10-01T05:30:00.000Z",
    "scope": "api_access"
  }
}
```

### ✅ Verificar Token

**Endpoint:** `POST /api/auth/verify`

**Petición:**
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://pruebas-api-l4yu.onrender.com/api/auth/verify
```

> ⚠️ **Importante:**
> - Guarda el token de forma segura
> - Los tokens expiran cada 30 minutos
> - Genera un nuevo token antes de que expire el actual
> - No compartas tokens entre diferentes usuarios

---

## 4. 📦 Endpoints de Órdenes

### 📋 Obtener Órdenes

**Endpoint:** `GET /api/orders`

**Descripción:** Obtiene una lista de órdenes con sus detalles completos. Soporta filtros avanzados y paginación.

#### 🔧 Parámetros de Query (Opcionales)

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `id_venta` | number | ID específico de la venta | 123 |
| `fecha_inicial` | date | Fecha de inicio (ISO 8601) | 2025-01-01 |
| `fecha_final` | date | Fecha de fin (ISO 8601) | 2025-01-31 |
| `plataforma` | string | Plataforma de venta | AMAZON, WALMART, LIVERPOOL, MELI, SEARS |
| `limit` | number | Número máximo de resultados | 50 (defecto) |
| `offset` | number | Número de registros a omitir | 0 (defecto) |

#### 📤 Ejemplos de Peticiones

```bash
# Obtener todas las órdenes
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://pruebas-api-l4yu.onrender.com/api/orders

# Filtrar por plataforma
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?plataforma=AMAZON"

# Filtrar por rango de fechas
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?fecha_inicial=2025-01-01&fecha_final=2025-01-31"

# Paginación
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?limit=10&offset=20"
```

#### 📥 Respuesta Exitosa

```json
{
  "success": true,
  "message": "Órdenes obtenidas exitosamente",
  "data": [
    {
      "id_venta": 10,
      "fecha": "2025-09-30T16:45:00.000Z",
      "plataforma": "AMAZON",
      "total": "1500.00",
      "estado": "COMPLETADA",
      "detalle": [
        {
          "id_detalle": 10,
          "sku": "SKU010",
          "cantidad": 1,
          "precio_unitario": "1500.00",
          "subtotal": "1500.00",
          "producto": {
            "nombre": "Producto 10",
            "descripcion": "Descripción del producto 10"
          }
        }
      ]
    }
  ],
  "count": 1,
  "filters": {
    "limit": 50,
    "offset": 0
  }
}
```

### 🔄 Actualizar Estado de Orden

**Endpoint:** `PUT /api/orders/{id_venta}`

**Descripción:** Actualiza el estado de una orden específica.

#### 🎯 Parámetros de URL
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id_venta` | number | ID único de la venta a actualizar |

#### 📋 Body de la Petición
| Campo | Tipo | Requerido | Valores Permitidos |
|-------|------|-----------|-------------------|
| `estado` | string | Sí | pendiente, procesando, enviado, entregado, cancelado |

#### 📤 Ejemplo de Petición
```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"estado": "enviado"}' \
  https://pruebas-api-l4yu.onrender.com/api/orders/123
```

### 📊 Exportar Órdenes

**Endpoint:** `GET /api/orders/excel`

**Descripción:** Obtiene los datos de órdenes en formato plano para exportación (sin JSON anidado).

#### 📤 Ejemplo de Petición
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders/excel?limit=100"
```

> 💡 **Nota:** Este endpoint devuelve los datos en estructura plana, ideal para generar reportes en Excel o CSV. Acepta los mismos filtros que el endpoint principal de órdenes.

---

## 5. 🛍️ Endpoints de Productos

### 📋 Obtener Productos

**Endpoint:** `GET /api/products`

**Descripción:** Obtiene una lista de productos con filtros opcionales y paginación.

#### 🔧 Parámetros de Query (Opcionales)

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `sku` | string | SKU específico del producto | SKU001 |
| `nombre` | string | Búsqueda por nombre (parcial) | laptop |
| `limit` | number | Número máximo de resultados | 50 (defecto) |
| `offset` | number | Número de registros a omitir | 0 (defecto) |

#### 📤 Ejemplos de Peticiones

```bash
# Obtener todos los productos
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://pruebas-api-l4yu.onrender.com/api/products

# Buscar por nombre
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/products?nombre=laptop"

# Buscar por SKU específico
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/products?sku=SKU001"
```

### 🔍 Obtener Producto por SKU

**Endpoint:** `GET /api/products/{sku}`

**Descripción:** Obtiene los detalles de un producto específico usando su SKU.

#### 📤 Ejemplo de Petición
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://pruebas-api-l4yu.onrender.com/api/products/SKU001
```

### ✏️ Actualizar Producto

**Endpoint:** `PUT /api/products/{sku}`

**Descripción:** Actualiza el nombre y/o descripción de un producto específico.

#### 📋 Body de la Petición
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | No | Nuevo nombre del producto (máx. 255 caracteres) |
| `descripcion` | string | No | Nueva descripción del producto (máx. 1000 caracteres) |

#### 📤 Ejemplo de Petición
```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop Dell Inspiron 15 - Edición 2025",
    "descripcion": "Nueva laptop con especificaciones mejoradas"
  }' \
  https://pruebas-api-l4yu.onrender.com/api/products/SKU001
```

> 💡 **Nota:** Puedes actualizar solo el nombre, solo la descripción, o ambos campos. Al menos uno debe estar presente en la petición.

---

## 6. 🔍 Filtros y Parámetros Detallados

### 📅 Filtros de Fecha

Los filtros de fecha utilizan el formato ISO 8601 y pueden combinarse para crear rangos:

| Combinación | Descripción | Ejemplo |
|-------------|-------------|---------|
| Solo `fecha_inicial` | Órdenes desde esa fecha en adelante | ?fecha_inicial=2025-01-01 |
| Solo `fecha_final` | Órdenes hasta esa fecha | ?fecha_final=2025-01-31 |
| Ambas fechas | Órdenes dentro del rango | ?fecha_inicial=2025-01-01&fecha_final=2025-01-31 |

### 🏪 Filtro de Plataforma

El filtro de plataforma utiliza búsqueda parcial (ILIKE), por lo que puedes buscar:
- **Exacto:** `?plataforma=AMAZON`
- **Parcial:** `?plataforma=AMZ` (encontrará AMAZON)
- **Case-insensitive:** `?plataforma=amazon`

### 📊 Paginación

Todos los endpoints que devuelven listas soportan paginación:

```bash
# Primera página (20 productos)
?limit=20&offset=0

# Segunda página (20 productos)
?limit=20&offset=20

# Tercera página (20 productos)
?limit=20&offset=40
```

### 🔗 Combinando Filtros

Puedes combinar múltiples filtros en una sola petición:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?plataforma=AMAZON&fecha_inicial=2025-01-01&limit=10"
```

> ⚠️ **Límites y Restricciones:**
> - **Límite máximo:** 1000 registros por petición
> - **Rate limit:** 1 petición por segundo por IP
> - **Timeout:** 30 segundos por petición
> - **Token expiry:** 30 minutos

---

## 7. 💡 Ejemplos Prácticos

### 🚀 Flujo Completo de Uso

#### Paso 1: Obtener Token
```bash
# Obtener token de acceso
TOKEN=$(curl -s -X POST https://pruebas-api-l4yu.onrender.com/api/auth/token | jq -r '.data.access_token')
echo "Token obtenido: $TOKEN"
```

#### Paso 2: Consultar Órdenes
```bash
# Obtener órdenes recientes
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?limit=5" | jq .
```

#### Paso 3: Filtrar por Plataforma
```bash
# Órdenes de Amazon del último mes
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?plataforma=AMAZON&fecha_inicial=2025-09-01" | jq .
```

#### Paso 4: Actualizar Estado
```bash
# Marcar orden como enviada
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"estado": "enviado"}' \
  https://pruebas-api-l4yu.onrender.com/api/orders/123 | jq .
```

### 📈 Casos de Uso Comunes

#### 🔍 Buscar Órdenes por ID
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?id_venta=123"
```

#### 📅 Órdenes del Día Actual
```bash
TODAY=$(date +%Y-%m-%d)
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders?fecha_inicial=${TODAY}&fecha_final=${TODAY}"
```

#### 🛍️ Buscar Producto por Nombre
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/products?nombre=laptop"
```

#### 📊 Exportar Datos para Reporte
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://pruebas-api-l4yu.onrender.com/api/orders/excel?fecha_inicial=2025-01-01&fecha_final=2025-01-31" \
  > reporte_enero.json
```

### 🔄 Script de Automatización

```bash
#!/bin/bash

# Script para obtener reporte diario
API_BASE="https://pruebas-api-l4yu.onrender.com/api"
TODAY=$(date +%Y-%m-%d)

# Obtener token
TOKEN=$(curl -s -X POST "$API_BASE/auth/token" | jq -r '.data.access_token')

# Obtener órdenes del día
curl -s -H "Authorization: Bearer $TOKEN" \
  "$API_BASE/orders?fecha_inicial=$TODAY&fecha_final=$TODAY" \
  | jq '.data | length' > ordenes_hoy.txt

echo "Órdenes procesadas hoy: $(cat ordenes_hoy.txt)"
```

---

## 8. ⚠️ Manejo de Errores

### 📋 Códigos de Estado HTTP

| Código | Descripción | Causa Común |
|--------|-------------|-------------|
| **200** | Éxito | Petición procesada correctamente |
| **400** | Bad Request | Parámetros inválidos o faltantes |
| **401** | Unauthorized | Token faltante, inválido o expirado |
| **404** | Not Found | Recurso no encontrado |
| **429** | Too Many Requests | Rate limit excedido |
| **500** | Internal Server Error | Error del servidor |

### 🔍 Formato de Respuestas de Error

#### Ejemplo de Error 401 (Token Expirado)
```json
{
  "success": false,
  "message": "Token expirado",
  "error": "El token ha caducado, solicite uno nuevo"
}
```

#### Ejemplo de Error 400 (Parámetros Inválidos)
```json
{
  "success": false,
  "message": "Parámetros de consulta inválidos",
  "error": "\"limit\" must be less than or equal to 1000"
}
```

#### Ejemplo de Error 429 (Rate Limit)
```json
{
  "success": false,
  "message": "Demasiadas peticiones desde esta IP",
  "error": "Por favor intente de nuevo más tarde"
}
```

### 🛠️ Solución de Problemas Comunes

> ❌ **Error: "Token expirado"**  
> **Solución:** Generar un nuevo token usando `POST /api/auth/token`

> ❌ **Error: "Rate limit exceeded"**  
> **Solución:** Esperar 1 segundo entre peticiones o implementar retry con backoff

> ❌ **Error: "Producto no encontrado"**  
> **Solución:** Verificar que el SKU existe usando `GET /api/products`

---

## 9. 🧪 Herramientas de Prueba

### 💻 Usando curl

curl es la herramienta de línea de comandos más versátil para probar APIs:

```bash
# Configurar variables
export API_BASE="https://pruebas-api-l4yu.onrender.com/api"
export TOKEN="your_token_here"

# Función helper para peticiones autenticadas
api_get() {
  curl -H "Authorization: Bearer $TOKEN" "$API_BASE/$1"
}

# Uso
api_get "products?limit=5"
```

### 📱 Usando Postman

1. Crear una nueva colección "Ecommerce API"
2. Configurar variable de entorno `{{base_url}}` = `https://pruebas-api-l4yu.onrender.com/api`
3. Configurar variable de entorno `{{token}}` con tu JWT
4. Agregar header global: `Authorization: Bearer {{token}}`

### 🔧 Health Check

Siempre puedes verificar que la API esté funcionando:

```bash
curl https://pruebas-api-l4yu.onrender.com/api/health
```

### 📊 Collection de Postman

Se incluye una collection de Postman pre-configurada con todos los endpoints en el archivo `postman-collection.json` del proyecto.

**Para importar:**
1. Abrir Postman
2. File → Import
3. Seleccionar `postman-collection.json`
4. Configurar variables de entorno

### 🐛 Debug y Logging

La API incluye logging detallado que puedes monitorear en la consola del servidor:
- 🔵 **Azul:** Peticiones entrantes
- 🟢 **Verde:** Operaciones exitosas
- 🔴 **Rojo:** Errores
- 🟡 **Amarillo:** Advertencias

---

## 📞 Soporte

**🛒 API Ecommerce v1.0.0**

Documentación generada el **Octubre 2025**

Para soporte técnico o consultas, contacta al equipo de desarrollo.