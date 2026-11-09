// src/server.js
// Punto de entrada: carga variables de entorno, conecta a MongoDB y
// SOLO ENTONCES levanta el servidor HTTP.
// Esto evita aceptar peticiones sin base de datos disponible.

require('dotenv').config();
const conectarDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API en http://localhost:${PORT}`);
  });
});
