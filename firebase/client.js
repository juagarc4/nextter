import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByCmkKLWnOmFlGx893pUROA0ao-HBrGLA",
  authDomain: "nextter-1d6b9.firebaseapp.com",
  databaseURL: "https://nextter-1d6b9.firebaseio.com",
  projectId: "nextter-1d6b9",
  storageBucket: "nextter-1d6b9.appspot.com",
  messagingSenderId: "1056308269210",
  appId: "1:1056308269210:web:7bdeb5f0777b97c10c8f23",
  measurementId: "G-HJE8C7PG4G",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export default function loginWithGitHub() {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
