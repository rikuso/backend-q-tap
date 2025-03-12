const db = require('./firebase'); // Asegúrate de que la ruta sea correcta

async function getSubscribersFromFirestore() {
  try {
    const contactsSnapshot = await db.collection('contact').get();
    const contacts = contactsSnapshot.docs.map(doc => doc.data());
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

module.exports = getSubscribersFromFirestore;
