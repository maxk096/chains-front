import { cloneDeep } from 'lodash'
import { action, flow, makeObservable, observable } from 'mobx'
import { LoadingStore } from '../loading/loading-store'
import { routes } from '../routing/routes'

export class DeleteHabitStore extends LoadingStore {
    constructor(props) {
        super()
        this.habitsTransport = props.habitsTransport
        this.uiStore = props.uiStore
        this.history = props.history
        this.isOpen = false
        this.habitClone = null
        makeObservable(this, {
            handleOnDelete: flow,
            isOpen: observable,
            setIsOpen: action
        })
    }

    openDeleteHabit = (habit) => {
        this.habitClone = cloneDeep(habit)
        this.setIsOpen(true)
    }

    onCancelClick = () => {
        this.closeDeleteHabit()
    }

    closeDeleteHabit = () => {
        this.setIsOpen(false)
        this.habitClone = null
    }

    setIsOpen = (value) => {
        this.isOpen = value
    }

    onDelete = async (...p) => {
        return await this.handleOnDelete(...p)
    };

    *handleOnDelete() {
        try {
            this.clearErrorState()
            const { name, id } = this.habitClone
            yield this.habitsTransport.deleteHabit(id)
            this.uiStore.showSnackbar('success', `${name} is deleted!`)
            this.closeDeleteHabit()
            this.history.push(routes.habits.url)
        } catch (ex) {
            this.setErrorState(ex.message)
        }
    }
}
