// src/config/db.js
// Establece la conexión a MongoDB usando Mongoose.
// Si falla, imprime el error y termina el proceso — es mejor fallar al arrancar
// que servir una API sin base de datos.

const mongoose = require('mongoose');

async function conectarDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = conectarDB;
