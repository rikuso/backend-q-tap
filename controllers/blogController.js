const db = require('../firebase');
const BlogPost = require('../models/blogModel');

exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await db.collection('blog').get();
    const postsData = posts.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(postsData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getBlogPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await db.collection('blog').where('slug', '==', slug).get();
    if (post.empty) {
      return res.status(404).send('Post not found');
    }
    const postData = post.docs[0].data();
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createBlogPost = async (req, res) => {
  const data = req.body;
  const blogPost = new BlogPost(data);
  try {
    const simplePageData = blogPost.toFirestoreObject();
    const docRef = await db.collection('blog').add(simplePageData);
    res.status(201).json({ id: docRef.id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const simplePageData = data.toFirestoreObject();
    await db.collection('blog').doc(id).update(simplePageData);
    res.status(200).json({ id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('blog').doc(id).delete();
    res.status(204).send('Post deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
