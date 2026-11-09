// src/models/Producto.js
// Define el schema de la colección "productos".
// Los campos requeridos producen un ValidationError (→ 400) si faltan en el body.

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    codigo: {
      type: Number,
      unique: true, // no se repite — se genera automáticamente en el controlador
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    categoria: {
      type: String,
      enum: ['bebida_caliente', 'bebida_fria', 'pasteleria', 'comida'],
      default: 'bebida_caliente',
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

module.exports = mongoose.model('Producto', productoSchema);
