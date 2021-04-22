import firebase from 'firebase/app'
import { getFirebaseApp } from '.'
import { promisifyFirebaseAuth } from './utils'

export class AuthFacade {
    constructor() {
        this.auth = getFirebaseApp().auth()
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
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
        return await promisifyFirebaseAuth(promise)
    }
}
