const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',cacheMiddleware(120), serviceController.getAllServices);
router.get('/:slug',cacheMiddleware(120), serviceController.getServiceBySlug);
router.post('/', authMiddleware, serviceController.createService);
router.put('/:id', authMiddleware, serviceController.updateService);
router.delete('/:id',authMiddleware, serviceController.deleteService);

module.exports = router;
