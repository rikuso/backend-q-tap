const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(helmet());

// Rutas
const pageRoutes = require('./routes/pageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const mediaFile = require('./routes/mediaFilesRoute');

app.use('/api/pages', pageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/file', mediaFile);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
