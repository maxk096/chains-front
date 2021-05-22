import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseApp
export const initFirebase = async () => {
    const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
    firebaseApp = firebase.initializeApp(firebaseConfig)
    await enablePersistance()
}

const enablePersistance = async () => {
    try {
        await getFirebaseApp().firestore().enablePersistence()
    } catch (ex) {}
}

export const getFirebaseApp = () => firebaseApp
