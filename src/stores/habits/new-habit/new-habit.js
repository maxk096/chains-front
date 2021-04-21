import { computed, flow, makeObservable } from 'mobx'
import { LoadingStore } from '../../loading/loading-store'
import { getDefaultHabit } from '../utils'

export class NewHabitStore extends LoadingStore {
    constructor(props) {
        super()
        makeObservable(this, {
            formProps: computed.struct,
            handleOnSubmit: flow
        })
        this.habitsTransport = props.habitsTransport
        this.newHabitModalStore = props.newHabitModalStore
        this.uiStore = props.uiStore
    }

    get formProps() {
        return {
            formError: this.getErrorState(),
            onCancelClick: this.onCancelClick
        }
    }

    getInitialValues = () => {
        return getDefaultHabit()
    }

    onCancelClick = () => {
        this.newHabitModalStore.closeNewHabitModal()
    }

    onSubmit = async (...p) => {
        return await this.handleOnSubmit(...p)
    };

    *handleOnSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            yield this.habitsTransport.createHabit(values)
            const { name } = values
            this.uiStore.showSnackbar('success', `${name} is created!`)
            this.newHabitModalStore.closeNewHabitModal()
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            setSubmitting(false)
        }
    }
}
