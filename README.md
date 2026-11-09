# API REST Cafetería

API REST construida con **Node.js + Express + MongoDB + JWT** como taller de desarrollo web.

## Entidad

Colección `productos` — menú de una cafetería (nombre, precio, categoría, disponibilidad).

---

## Requisitos

- Node.js 18+
- MongoDB corriendo en `127.0.0.1:27017` (o connection string en `.env`)
- Postman (para pruebas)

---

## Procedimiento de inicialización

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar la plantilla de variables de entorno y rellenarla
copy .env.example .env
# Edita .env: pon tu MONGO_URI, un JWT_SECRET largo y las credenciales del seed

# 3. Crear el usuario de prueba (contraseña hasheada con bcrypt)
npm run seed

# 4. Levantar el servidor
npm start

# Desarrollo con reinicio automático:
npm run dev
```

> Los secretos viven en `.env`, que **no forma parte de la entrega**.

---

## Rutas

| Método | Ruta             | JWT | Descripción                        | Código OK |
|--------|------------------|-----|------------------------------------|-----------|
| POST   | /auth/login      | No  | Login — devuelve JWT               | 200       |
| POST   | /productos       | Sí  | Crear producto                     | 201       |
| GET    | /productos       | Sí  | Listar todos los productos         | 200       |
| GET    | /productos/:id   | Sí  | Obtener un producto por ID         | 200 / 404 |
| PUT    | /productos/:id   | Sí  | Actualizar un producto             | 200 / 404 |
| DELETE | /productos/:id   | Sí  | Eliminar un producto               | 200 / 404 |

Códigos de error: `401` sin token / token inválido o vencido · `400` campo faltante · `404` no existe.

---

## Usuario de prueba

| Campo | Valor               |
|-------|---------------------|
| Email | barista@cafeteria.com |
| Contraseña | *(comunicada al docente por separado — no está en este repositorio)* |

---

## Importar colección de Postman

1. Abre Postman → **Import**
2. Selecciona `postman/Cafeteria.postman_collection.json`
3. La variable `baseUrl` apunta a `http://localhost:3000`
4. Ejecuta **"1a. Login válido"** — el token se guarda automáticamente en la variable `token`

---

## Evidencia en base de datos (MongoDB Compass)

Conectar a `mongodb://127.0.0.1:27017` y abrir la base de datos `cafeteria`.

Consultas directas con `mongosh`:

```js
use cafeteria
db.productos.find().pretty()
db.productos.countDocuments()
// Ver usuario sin exponer el hash
db.usuarios.find({}, { passwordHash: 0 })
```

---

## Generar token vencido (prueba 6c)

```bash
node -e "require('dotenv').config(); console.log(require('jsonwebtoken').sign({sub:'x'}, process.env.JWT_SECRET, {expiresIn:'1s'}))"
```

Espera 2 segundos y úsalo en Postman → debe devolver `401 Token expirado`.

---

## Estructura del proyecto

```
src/
├─ server.js                  # Punto de entrada
├─ app.js                     # Express + rutas + middlewares
├─ config/db.js               # Conexión a MongoDB
├─ models/Producto.js         # Schema de productos
├─ models/Usuario.js          # Schema de usuarios
├─ middleware/auth.js         # Verificación JWT
├─ middleware/errorHandler.js # Manejador central de errores
├─ routes/auth.routes.js      # POST /auth/login
├─ routes/productos.routes.js # CRUD /productos
└─ controllers/
   ├─ auth.controller.js      # Lógica de login
   └─ productos.controller.js # Lógica CRUD + consultas Mongo
scripts/
└─ seed-user.js               # Crea usuario de prueba
postman/
└─ Cafeteria.postman_collection.json
```
