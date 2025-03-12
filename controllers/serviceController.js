const Service = require('../models/serviceModel');
const db = require('../firebase');

exports.getAllServices = async (req, res) => {
  try {
    const services = await db.collection('services').get();
    const servicesData = services.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(servicesData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getServiceBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const service = await db.collection('services').where('slug', '==', slug).get();
    if (service.empty) {
      return res.status(404).send('Service not found');
    }
    const serviceData = service.docs[0].data();
    res.status(200).json(serviceData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createService = async (req, res) => {
  const data = req.body;
  const service = new Service(data);
  try {
    const simplePageData = service.toFirestoreObject();
    const docRef = await db.collection('services').add(simplePageData);
    res.status(201).json({ id: docRef.id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const service = new Service({ ...data, updated_at: new Date() });
  try {
    const simplePageData = service.toFirestoreObject();
    await db.collection('services').doc(id).update(simplePageData);
    res.status(200).json({ id, ...simplePageData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('services').doc(id).delete();
    res.status(204).send('Service deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
