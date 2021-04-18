import { action, makeObservable, observable } from 'mobx'

export class NewHabitModalStore {
    isOpen = false
    state = null

    constructor() {
        makeObservable(this, {
            isOpen: observable,
            state: observable,
            openAddNewHabit: action,
            closeAddNewHabit: action
        })
    }

    openAddNewHabit = (state) => {
        this.state = state
        this.isOpen = true
    }

    closeAddNewHabit = () => {
        this.isOpen = false
        this.state = null
    }
}
