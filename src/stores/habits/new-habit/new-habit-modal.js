import { action, makeObservable, observable } from 'mobx'

export const modalState = {
    NEW_HABIT: 'NEW_HABIT',
    ADD_NEW_FROM_PHOTO: 'ADD_NEW_FROM_PHOTO',
    PREDEFINED_HABITS: 'PREDEFINED_HABITS'
}

export class NewHabitModalStore {
    isOpen = false
    state = null

    constructor() {
        makeObservable(this, {
            isOpen: observable,
            state: observable,
            openNewHabitModal: action,
            closeNewHabitModal: action
        })
    }

    openNewHabitModal = (state) => {
        this.state = state
        this.isOpen = true
    }

    closeNewHabitModal = () => {
        this.isOpen = false
        this.state = null
    }
}
