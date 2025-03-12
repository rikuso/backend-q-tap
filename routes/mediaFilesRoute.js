const express = require('express');
const router = express.Router();
//controlador
const mediaFilesController = require('../controllers/MediaFilesControlles');
//cache de middleware
const cacheMiddleware = require('../middleware/cacheMiddleware');
//segurida post update
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', cacheMiddleware(120), mediaFilesController.getAllFile);
router.post('/', authMiddleware, mediaFilesController.createFile);
router.put('/:id', authMiddleware, mediaFilesController.updateFile);
router.delete('/:id', authMiddleware, mediaFilesController.deleteFile);

module.exports = router;