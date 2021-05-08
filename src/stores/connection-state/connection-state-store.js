import { action, makeObservable, observable } from 'mobx'

export class ConnectionStateStore {
    constructor() {
        this.isOnline = null
        this.isInitialized = false
        makeObservable(this, {
            isOnline: observable,
            isInitialized: observable,
            setIsOnline: action
        })
    }

    init = () => {
        this.setIsOnline(navigator.onLine)
        window.addEventListener('online', this.onConnectionChange)
        window.addEventListener('offline', this.onConnectionChange)
        this.isInitialized = true
    }

    cleanUp = () => {
        window.removeEventListener('online', this.onConnectionChange)
        window.removeEventListener('offline', this.onConnectionChange)
    }

    onConnectionChange = (ev) => {
        this.setIsOnline(ev.type === 'online')
    }

    setIsOnline = (isOnline) => {
        this.isOnline = isOnline
    }
}
