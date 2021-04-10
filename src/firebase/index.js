import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseApp
export const initFirebase = () => {
    const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
    firebaseApp = firebase.initializeApp(firebaseConfig)
}

export const getFirebaseApp = () => firebaseApp
