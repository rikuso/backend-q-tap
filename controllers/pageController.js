const Page = require('../models/pageModel');
const db = require('../firebase');

exports.getAllPages = async (req, res) => {
  try {
    const pages = await db.collection('pages').get();
    const pagesData = pages.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(pagesData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPageBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const page = await db.collection('pages').where('slug', '==', slug).get();
    if (page.empty) {
      return res.status(404).send('Page not found');
    }
    const pageData = page.docs[0].data();
    res.status(200).json(pageData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPage = async (req, res) => {
  const data = req.body;
  const page = new Page(data);
  try {
    const simplePageData = page.toFirestoreObject();
    const docRef = await db.collection('pages').add(simplePageData);
    res.status(201).json({ id: docRef.id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePage = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const page = new Page({ ...data, updated_at: new Date() });
  try {
    const simplePageData = page.toFirestoreObject();
    await db.collection('pages').doc(id).update(simplePageData);
    res.status(200).json({ id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePage = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('pages').doc(id).delete();
    res.status(204).send('Page deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
