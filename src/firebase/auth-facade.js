import firebase from 'firebase/app'
import { getFirebaseApp } from '.'
import { promisifyFirebaseAuth } from './utils'

export class AuthFacade {
    constructor() {
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
    }

    get auth() {
        return getFirebaseApp().auth()
    }

    get db() {
        return getFirebaseApp().firestore()
    }

    createUserWithEmailAndPassword = async (email, password) => {
        const promise = this.auth.createUserWithEmailAndPassword(email, password)
        return await promisifyFirebaseAuth(promise)
    }

    signInWithEmailAndPassword = async (email, password) => {
        const promise = this.auth.signInWithEmailAndPassword(email, password)
        return await promisifyFirebaseAuth(promise)
    }

    googleSignInWithRedirect = async () => {
        const promise = this.auth.signInWithRedirect(this.googleProvider)
        return await promisifyFirebaseAuth(promise)
    }

    onAuthStateChanged = (fn) => {
        return this.auth.onAuthStateChanged(fn)
    }

    signOut = async () => {
        const promise = this.auth.signOut()
        const res = await promisifyFirebaseAuth(promise)
        await this.db.terminate()
        await this.db.clearPersistence()
        await this.db.enablePersistance()
        return res
    }
}
