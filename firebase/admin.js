const admin = require('firebase-admin')

// const serviceAccount = require('./firebase_private_key.json')
const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
  })
} catch (e) {}
export const firestore = admin.firestore()
