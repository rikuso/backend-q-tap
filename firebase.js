const admin = require('firebase-admin');
const serviceAccount = require('./q-tap-a727e-firebase-adminsdk-fbsvc-18f2d790e0.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://q-tap-a727e.firebaseio.com'
});

const db = admin.firestore();
module.exports = db;
