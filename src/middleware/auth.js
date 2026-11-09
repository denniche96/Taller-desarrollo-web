// src/middleware/auth.js
// Middleware JWT: verifica firma y vencimiento antes de cada operación del CRUD.
// Si algo falla, responde 401 y NO llama a next() — el controlador nunca se ejecuta
// y la base de datos no se consulta.

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // 1. Leer el header Authorization
  const authHeader = req.headers['authorization'];

  // 2. Si falta el header → 401
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // 3. Separar "Bearer <token>"; validar el esquema
  const partes = authHeader.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  const token = partes[1];

  // 4. Verificar firma + expiración con jwt.verify
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Éxito: adjuntar datos del usuario al request y continuar
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    // 6. Distinguir token vencido de token manipulado
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    return res.status(401).json({ error: 'No autorizado' });
  }
}

module.exports = auth;
