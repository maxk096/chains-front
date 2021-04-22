import { action, flow, makeObservable, observable } from 'mobx'
import { promisifyFirebaseAuth } from '../../firebase/utils'

export class UserStore {
    user = null
    isInitialized = false

    constructor(props) {
        makeObservable(this, {
            user: observable,
            isInitialized: observable,
            onAuthStateChanged: action,
            handleSignOut: flow
        })
        this.authFacade = props.authFacade
        this.onAuthStateChangedUnsub = this.authFacade.onAuthStateChanged(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        this.isInitialized = true
        this.user = user
    }

    cleanUp = () => {
        this.onAuthStateChangedUnsub()
    }

    onSignOut = async () => {
        await this.handleSignOut()
    };

    *handleSignOut() {
        try {
            yield this.authFacade.signOut()
        } catch (ex) {}
    }

    getUserIdToken = async () => {
        return await promisifyFirebaseAuth(this.user.getIdToken())
    }
}
