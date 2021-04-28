import { cloneDeep } from 'lodash'
import { action, computed, flow, makeObservable, observable } from 'mobx'
import { LoadingStore } from '../../loading/loading-store'
import { getPredefinedHabits } from './predefined-habits'

export const modalState = {
    PREDEFINED_HABITS: 'PREDEFINED_HABITS',
    PREDEFINED_HABIT_CREATION: 'PREDEFINED_HABIT_CREATION'
}

export class NewPredefinedHabitStore extends LoadingStore {
    constructor(props) {
        super()
        this.habitsTransport = props.habitsTransport
        this.newHabitModalStore = props.newHabitModalStore
        this.uiStore = props.uiStore
        this.predefinedHabits = getPredefinedHabits()
        this.setState(modalState.PREDEFINED_HABITS)
        this.selectedHabit = null
        makeObservable(this, {
            formProps: computed.struct,
            handleOnSubmit: flow,
            state: observable,
            setState: action
        })
    }

    get formProps() {
        return {
            formError: this.getErrorState(),
            onCancelClick: this.onFormCancelClick
        }
    }

    setState = (state) => {
        this.state = state
    }

    getInitialValues = () => {
        return this.selectedHabit
    }

    onHabitsListCancelClick = () => {
        this.newHabitModalStore.closeNewHabitModal()
    }

    onFormCancelClick = () => {
        this.goToHabitsList()
    }

    goToHabitsList = () => {
        this.clearErrorState()
        this.setState(modalState.PREDEFINED_HABITS)
        this.selectedHabit = null
    }

    selectHabit = (habit) => {
        this.selectedHabit = cloneDeep(habit)
        delete this.selectedHabit.id
        this.setState(modalState.PREDEFINED_HABIT_CREATION)
    }

    onSubmit = async (...p) => {
        return await this.handleOnSubmit(...p)
    };

    *handleOnSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            delete values.id
            yield this.habitsTransport.createHabit(values)
            const { name } = values
            this.uiStore.showSnackbar('success', `${name} is created!`)
            this.goToHabitsList()
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            setSubmitting(false)
        }
    }
}
