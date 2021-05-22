import { action, computed, flow, makeObservable, observable, runInAction } from 'mobx'
import { LoadingStore } from '../../loading/loading-store'
import { getDefaultHabit } from '../utils'

export const modalState = {
    UPLOAD_PHOTO: 'UPLOAD_PHOTO',
    DECODED_HABITS: 'DECODED_HABITS',
    ADD_NEW_HABIT: 'ADD_NEW_HABIT'
}

export const loadingState = {
    IMAGE_DECODING: 'IMAGE_DECODING'
}

export const errorState = {
    IMAGE_DECODING_ERROR: 'IMAGE_DECODING_ERROR'
}

export class NewHabitFromPhotoStore extends LoadingStore {
    constructor(props) {
        super()
        this.habitsTransport = props.habitsTransport
        this.newHabitModalStore = props.newHabitModalStore
        this.uiStore = props.uiStore
        this.state = modalState.UPLOAD_PHOTO
        this.decodedHabits = null
        this.selectedHabits = new Set()
        this.habitInitialValues = null
        makeObservable(this, {
            habitFormProps: computed.struct,
            handleOnHabitSubmit: flow,
            state: observable,
            setState: action,
            handleOnFileChange: flow,
            decodedHabits: observable,
            selectedHabits: observable,
            onCancelHabitsList: action,
            habitInitialValues: observable,
            setHabitInitialValues: action
        })
    }

    get habitFormProps() {
        return {
            formError: this.getErrorState(),
            onCancelClick: this.onCancelHabitForm
        }
    }

    onCancelHabitForm = () => {
        this.setState(modalState.DECODED_HABITS)
        this.setHabitInitialValues(null)
    }

    onCancelHabitsList = () => {
        this.setState(modalState.UPLOAD_PHOTO)
        this.decodedHabits = null
        this.selectedHabits = new Set()
    }

    getHabitInitialValues = () => {
        return this.habitInitialValues
    }

    setHabitInitialValues = (value) => {
        this.habitInitialValues = value
    }

    setState = (state) => {
        this.state = state
    }

    onUploadCancelClick = () => {
        this.newHabitModalStore.closeNewHabitModal()
    }

    onHabitSubmit = async (...p) => {
        return await this.handleOnHabitSubmit(...p)
    };

    *handleOnHabitSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            yield this.habitsTransport.createHabit(values)
            const { name } = values
            this.uiStore.showSnackbar('success', `${name} is created!`)
            this.selectedHabits.clear()
            this.setState(modalState.DECODED_HABITS)
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            setSubmitting(false)
        }
    }

    onFileChange = async (...p) => {
        return await this.handleOnFileChange(...p)
    };

    *handleOnFileChange(ev) {
        try {
            this.deleteErrorState(errorState.IMAGE_DECODING_ERROR)
            this.addLoadingState(loadingState.IMAGE_DECODING)
            const res = yield this.habitsTransport.decodeImageWithHabits(ev.target.files[0])
            const text = (yield res.json()).text
            this.decodedHabits = this.parseDecodedHabits(text)
            this.setState(modalState.DECODED_HABITS)
        } catch (ex) {
            this.addErrorState(errorState.IMAGE_DECODING_ERROR, ex.message || 'Unable to decode a photo.')
        } finally {
            this.deleteLoadingState(loadingState.IMAGE_DECODING)
        }
    }

    parseDecodedHabits = (text) => {
        const parsedText = text
            .split('\n')
            .map((v) => v.trim())
            .filter(Boolean)
            .map((name) => ({ name, id: Math.random().toString(32) }))
        if (!parsedText.length) {
            throw new Error('No text has been found.')
        }
        return parsedText
    }

    onHabitSelectChange = (id) => () => {
        runInAction(() => {
            if (this.isHabitSelected(id)) {
                this.selectedHabits.delete(id)
            } else {
                this.selectedHabits.add(id)
            }
        })
    }

    isHabitSelected = (id) => {
        return this.selectedHabits.has(id)
    }

    onCreateSelectedHabits = () => {
        const habitName = [...this.selectedHabits].map((habit) => habit.name).join(' ')
        const defaultHabit = getDefaultHabit()
        defaultHabit.name = habitName
        this.setHabitInitialValues(defaultHabit)
        this.setState(modalState.ADD_NEW_HABIT)
    }

    onHabitCreationFinish = () => {
        this.newHabitModalStore.closeNewHabitModal()
    }
}
