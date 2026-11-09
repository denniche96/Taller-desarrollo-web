// src/routes/auth.routes.js
// Única ruta pública — NO tiene el middleware auth.
// POST /auth/login

const { Router } = require('express');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', login);

module.exports = router;
