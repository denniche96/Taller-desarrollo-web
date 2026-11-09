// src/models/Usuario.js
// Schema del usuario de prueba para el login.
// El campo se llama "passwordHash" a propósito — deja explícito que nunca
// se almacena texto plano en la base de datos.

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'La contraseña hasheada es obligatoria'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
