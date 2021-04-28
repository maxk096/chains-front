import { action, makeObservable, observable } from 'mobx'

export class HabitsStore {
    constructor(props) {
        this.habitsTransport = props.habitsTransport
        this.onHabitsChangeUnsub = null
        this.isHabitsInitialized = false
        this.habits = null
        makeObservable(this, {
            habits: observable,
            onHabitsChange: action,
            isHabitsInitialized: observable
        })
    }

    init = () => {
        this.onHabitsChangeUnsub = this.habitsTransport.habitsCollection
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onHabitsChange)
    }

    cleanUp = () => {
        this.onHabitsChangeUnsub()
    }

    onHabitsChange = (snapshot) => {
    console.log('🚀 ~ file: habits-store.js ~ line 27 ~ HabitsStore ~ snapshot', snapshot.metadata)
        const data = []
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        })
        this.habits = data
        this.isHabitsInitialized = true
    }
}
