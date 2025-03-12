const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
//cache de middleware
const cacheMiddleware = require('../middleware/cacheMiddleware');
//segurida post update
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',cacheMiddleware(120), pageController.getAllPages);
router.get('/:slug',cacheMiddleware(120), pageController.getPageBySlug);
router.post('/', authMiddleware, pageController.createPage);
router.put('/:id', authMiddleware, pageController.updatePage);
router.delete('/:id',authMiddleware, pageController.deletePage);

module.exports = router;
