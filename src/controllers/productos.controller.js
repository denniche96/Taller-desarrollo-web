// src/controllers/productos.controller.js
// Todas las consultas a MongoDB viven aquí.
// Las rutas solo enrutan; los modelos solo definen el schema.
// El campo "codigo" (1, 2, 3...) se genera automáticamente como auto-increment.

const Producto = require('../models/Producto');

// Genera el siguiente código numérico disponible (auto-increment manual)
async function siguienteCodigo() {
  const ultimo = await Producto.findOne().sort({ codigo: -1 });
  return ultimo ? ultimo.codigo + 1 : 1;
}

// POST /productos → 201 + documento creado (con codigo 1, 2, 3...)
async function crear(req, res, next) {
  try {
    const codigo = await siguienteCodigo();
    const producto = await Producto.create({ ...req.body, codigo });
    return res.status(201).json(producto);
  } catch (err) {
    next(err);
  }
}

// GET /productos → 200 + arreglo (vacío también es 200)
async function listar(req, res, next) {
  try {
    const productos = await Producto.find().sort({ codigo: 1 });
    return res.status(200).json(productos);
  } catch (err) {
    next(err);
  }
}

// GET /productos/:id → busca por campo "codigo" (1, 2, 3...)
async function obtenerPorId(req, res, next) {
  try {
    const producto = await Producto.findOne({ codigo: Number(req.params.id) });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.status(200).json(producto);
  } catch (err) {
    next(err);
  }
}

// PUT /productos/:id → actualiza por campo "codigo"
// { new: true }           → devuelve el documento DESPUÉS del cambio
// { runValidators: true } → aplica validaciones del schema también en updates
async function actualizar(req, res, next) {
  try {
    const producto = await Producto.findOneAndUpdate(
      { codigo: Number(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.status(200).json(producto);
  } catch (err) {
    next(err);
  }
}

// DELETE /productos/:id → elimina por campo "codigo"
async function eliminar(req, res, next) {
  try {
    const producto = await Producto.findOneAndDelete({ codigo: Number(req.params.id) });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.status(200).json({ mensaje: 'Producto eliminado correctamente', codigo: Number(req.params.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { crear, listar, obtenerPorId, actualizar, eliminar };
