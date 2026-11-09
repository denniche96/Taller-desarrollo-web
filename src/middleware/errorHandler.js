// src/middleware/errorHandler.js
// Manejador central de errores. Debe registrarse como el ÚLTIMO middleware en app.js.
// Los errores llegan aquí cuando un controlador llama a next(err).

function errorHandler(err, req, res, next) {
  // Error de validación de Mongoose (campo requerido faltante, minlength, enum, etc.)
  if (err.name === 'ValidationError') {
    const campos = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Validación fallida', detalles: campos });
  }

  // CastError: el :id proporcionado no tiene formato válido de ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Identificador inválido' });
  }

  // Código 11000: violación de índice único (email duplicado en seed)
  if (err.code === 11000) {
    return res.status(409).json({ error: 'El recurso ya existe (valor duplicado)' });
  }

  // Cualquier otro error — registrar en consola pero NO filtrar detalles al cliente
  console.error('Error interno:', err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;
