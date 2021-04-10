import { makeObservable, observable } from 'mobx'
import { getFirebaseApp } from '../../firebase'

export class UserStore {
    user = null

    constructor() {
        makeObservable(this, {
            user: observable
        })

        this.onAuthStateChangedUnsub = getFirebaseApp().auth().onAuthStateChanged(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        this.user = user
    }

    cleanUp = () => {
        this.onAuthStateChangedUnsub()
    }
}
