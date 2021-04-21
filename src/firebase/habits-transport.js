import { computed, makeObservable } from 'mobx'
import { getFirebaseApp } from '.'

export class HabitsTransport {
    constructor(props) {
        this.db = getFirebaseApp().firestore()
        this.userStore = props.userStore
        makeObservable(this, {
            userId: computed,
            habitsCollection: computed
        })
    }

    get userId() {
        return this.userStore.user?.uid
    }

    get habitsCollection() {
        return this.db.collection('app').doc('habits').collection(this.userId)
    }

    createHabit = async (habit) => {
        return this.habitsCollection.add(habit)
    }
}
