import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByCmkKLWnOmFlGx893pUROA0ao-HBrGLA',
  authDomain: 'nextter-1d6b9.firebaseapp.com',
  databaseURL: 'https://nextter-1d6b9.firebaseio.com',
  projectId: 'nextter-1d6b9',
  storageBucket: 'nextter-1d6b9.appspot.com',
  messagingSenderId: '1056308269210',
  appId: '1:1056308269210:web:7bdeb5f0777b97c10c8f23',
  measurementId: 'G-HJE8C7PG4G',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addNexttit = ({ avatar, content, img, userId, userName }) => {
  return db.collection('nexttits').add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestNexttits = () => {
  return db
    .collection('nexttits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}
