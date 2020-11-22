const admin = require('firebase-admin')

const serviceAccount = require('./firebase_private_key.json')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nextter-1d6b9.firebaseio.com',
  })
} catch (e) {}
export const firestore = admin.firestore()
