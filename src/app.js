// src/app.js
// Instancia de Express: middlewares globales, montaje de rutas y manejadores de error.
// auth se aplica UNA sola vez en app.use — más seguro que repetirlo en cada ruta.

const express = require('express');
const authRoutes      = require('./routes/auth.routes');
const productosRoutes = require('./routes/productos.routes');
const auth            = require('./middleware/auth');
const errorHandler    = require('./middleware/errorHandler');

const app = express();

// Parsear cuerpos JSON
app.use(express.json());

// Ruta pública: login
app.use('/auth', authRoutes);

// Rutas del CRUD — protegidas por JWT (auth se ejecuta antes que el router)
app.use('/productos', auth, productosRoutes);

// 404 para cualquier ruta no definida
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador central de errores — siempre el ÚLTIMO
app.use(errorHandler);

module.exports = app;
