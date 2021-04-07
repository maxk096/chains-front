import { makeObservable, observable } from 'mobx'
import { lightTheme } from './themes/light'

export class ThemeStore {
    constructor() {
        this.theme = lightTheme
        makeObservable(this, {
            theme: observable
        })
    }
}
