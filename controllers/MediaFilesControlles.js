const MediaFiles = require('../models/media_files');
const db = require('../firebase');

exports.getAllFile = async (req, res) => {
  try {
    const file = await db.collection('files').get();
    const fileData = file.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(fileData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createFile = async (req, res) => {
  const data = req.body;
  const file = new MediaFiles(data);
  try {
    const simpleFileData = file.toFirestoreObject();
    const docRef = await db.collection('files').add(simpleFileData);
    res.status(201).json({ id: docRef.id, ...simpleFileData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateFile = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = new MediaFiles({ ...data, updated_at: new Date() });
  try {
    const simpleFileData = file.toFirestoreObject();
    await db.collection('files').doc(id).update(simpleFileData);
    res.status(200).json({ id, ...simpleFileData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('files').doc(id).delete();
    res.status(204).send('file deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
