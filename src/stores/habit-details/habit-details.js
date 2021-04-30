import { action, makeObservable, observable } from 'mobx'

export class HabitDetailsStore {
    constructor(props) {
        this.habitId = props.habitId
        this.habitsTransport = props.habitsTransport
        this.onHabitChangeUnsub = null
        this.isHabitInitialized = false
        this.habit = null
        makeObservable(this, {
            habit: observable,
            onHabitChange: action,
            isHabitInitialized: observable
        })
    }

    init = () => {
        this.onHabitChangeUnsub = this.habitsTransport.habitsCollection
            .doc(this.habitId)
            .onSnapshot(this.onHabitChange)
    }

    cleanUp = () => {
        this.onHabitChangeUnsub()
    }

    onHabitChange = (snapshot) => {
        this.habit = { id: snapshot.id, ...snapshot.data() }
        this.isHabitInitialized = true
    }
}
