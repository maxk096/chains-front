import { cloneDeep } from 'lodash'
import { action, computed, flow, makeObservable, observable } from 'mobx'
import { LoadingStore } from '../loading/loading-store'

export class HabitEditStore extends LoadingStore {
    constructor(props) {
        super()
        this.habitsTransport = props.habitsTransport
        this.uiStore = props.uiStore
        this.isOpen = false
        this.habitClone = null
        makeObservable(this, {
            formProps: computed.struct,
            handleOnSubmit: flow,
            isOpen: observable,
            setIsOpen: action
        })
    }

    get formProps() {
        return {
            formError: this.getErrorState(),
            onCancelClick: this.onCancelClick
        }
    }

    getInitialValues = () => {
        return this.habitClone
    }

    openEditHabit = (habit) => {
        this.habitClone = cloneDeep(habit)
        this.setIsOpen(true)
    }

    onCancelClick = () => {
        this.closeHabitEdit()
    }

    closeHabitEdit = () => {
        this.setIsOpen(false)
        this.habitClone = null
    }

    setIsOpen = (value) => {
        this.isOpen = value
    }

    onSubmit = async (...p) => {
        return await this.handleOnSubmit(...p)
    };

    *handleOnSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            yield this.habitsTransport.updateHabit(values)
            const { name } = values
            this.uiStore.showSnackbar('success', `${name} is updated!`)
            this.closeHabitEdit()
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            setSubmitting(false)
        }
    }
}
