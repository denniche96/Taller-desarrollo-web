// scripts/seed-user.js
// Script de inicialización — crea el usuario de prueba con contraseña hasheada.
// Es IDEMPOTENTE: se puede correr varias veces sin duplicar el usuario.
// Nunca imprime la contraseña ni el hash — solo el email.

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../src/models/Usuario');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    const email = process.env.SEED_EMAIL;
    const password = process.env.SEED_PASSWORD;

    if (!email || !password) {
      console.error('Faltan SEED_EMAIL o SEED_PASSWORD en el .env');
      process.exit(1);
    }

    // Comprobar si ya existe para evitar duplicados
    const existente = await Usuario.findOne({ email });
    if (existente) {
      console.log(`El usuario "${email}" ya existe. No se creó nada nuevo.`);
      await mongoose.disconnect();
      return;
    }

    // Hashear la contraseña (10 rounds de bcrypt)
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el usuario — solo se guarda el hash, nunca el texto plano
    await Usuario.create({ email, passwordHash });

    // Imprimir SOLO el email, nunca la contraseña ni el hash
    console.log(`Usuario creado: ${email}`);

    await mongoose.disconnect();
    console.log('Conexión cerrada. Seed completado.');
  } catch (err) {
    console.error('Error en seed:', err.message);
    process.exit(1);
  }
}

seed();
