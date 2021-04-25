import { action, computed, makeObservable, observable } from 'mobx'

export class HabitsStore {
    constructor(props) {
        this.habitsTransport = props.habitsTransport
        this.onHabitsChangeUnsub = null
        this.onExecutionsChangeUnsub = null
        this.isHabitsInitialized = false
        this.habits = null
        makeObservable(this, {
            habits: observable,
            onHabitsChange: action,
            isExecutionsInitialized: observable,
            isInitialized: computed
        })
    }

    get isInitialized() {
        return this.isHabitsInitialized
    }

    init = () => {
        this.onHabitsChangeUnsub = this.habitsTransport.habitsCollection.onSnapshot(
            { includeMetadataChanges: true },
            this.onHabitsChange
        )
    }

    cleanUp = () => {
        this.onHabitsChangeUnsub()
    }

    onHabitsChange = (snapshot) => {
        const data = []
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        })
        this.habits = data
        this.isHabitsInitialized = true
    }
}
