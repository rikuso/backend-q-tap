const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',cacheMiddleware(120), blogController.getAllBlogPosts);
router.get('/:slug',cacheMiddleware(120), blogController.getBlogPostBySlug);
router.post('/', blogController.createBlogPost);
router.put('/:id', blogController.updateBlogPost);
router.delete('/:id',authMiddleware, blogController.deleteBlogPost);

module.exports = router;
