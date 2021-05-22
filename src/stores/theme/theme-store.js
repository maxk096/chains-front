import { makeObservable, observable } from 'mobx'
import { blueTheme } from './themes/blue'

export class ThemeStore {
    constructor() {
        this.theme = blueTheme
        makeObservable(this, {
            theme: observable
        })
    }
}
