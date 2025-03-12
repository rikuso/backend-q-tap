const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  // Asegúrate de que el token comienza con "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Invalid token format.');
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token); // Log para verificar el token recibido

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log('Decoded Token:', decoded);
    next();
  } catch (ex) {
    console.error('Token Verification Error:', ex.message); // Log para verificar el error
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
