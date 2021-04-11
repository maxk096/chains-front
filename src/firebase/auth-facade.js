import firebase from 'firebase/app'
import { getFirebaseApp } from '.'

export class AuthFacade {
    constructor() {
        this.auth = getFirebaseApp().auth()
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
    }

    promisifyFirebaseAuth = async (authPromise) => {
        const rejectionKey = Symbol()
        const valueOrError = await authPromise.catch((error) => {
            return { [rejectionKey]: true, error }
        })

        if (valueOrError[rejectionKey]) {
            throw valueOrError.error
        } else {
            return valueOrError
        }
    }

    createUserWithEmailAndPassword = async (email, password) => {
        const promise = this.auth.createUserWithEmailAndPassword(email, password)
        return await this.promisifyFirebaseAuth(promise)
    }

    signInWithEmailAndPassword = async (email, password) => {
        const promise = this.auth.signInWithEmailAndPassword(email, password)
        return await this.promisifyFirebaseAuth(promise)
    }

    googleSignInWithRedirect = async () => {
        const promise = this.auth.signInWithRedirect(this.googleProvider)
        return await this.promisifyFirebaseAuth(promise)
    }
}
