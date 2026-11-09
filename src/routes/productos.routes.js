// src/routes/productos.routes.js
// Las 5 rutas del CRUD. El middleware auth se aplica en app.js, antes de este router,
// así que todas las rutas aquí quedan protegidas automáticamente.

const { Router } = require('express');
const {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
} = require('../controllers/productos.controller');

const router = Router();

router.post('/',      crear);
router.get('/',       listar);
router.get('/:id',    obtenerPorId);
router.put('/:id',    actualizar);
router.delete('/:id', eliminar);

module.exports = router;
