// src/controllers/auth.controller.js
// Controlador del login. Única ruta pública de la API.
// Compara la contraseña con bcrypt y firma un JWT con vencimiento.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1. Validar que se envíen ambos campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // 2. Buscar el usuario por email
    const usuario = await Usuario.findOne({ email });

    // 3. Si no existe → 401 con mensaje genérico (no revelar qué emails existen)
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 4. Comparar la contraseña con el hash almacenado
    const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);

    // Mismo mensaje si la contraseña es incorrecta — no revelar qué falló
    if (!passwordCorrecta) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 5. Éxito: firmar el JWT con sub + email, siempre con vencimiento
    const token = jwt.sign(
      { sub: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // La respuesta NO incluye hash, secreto ni datos sensibles del usuario
    return res.status(200).json({ token, expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
