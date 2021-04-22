import { computed, makeObservable } from 'mobx'
import { getFirebaseApp } from '.'

export class HabitsTransport {
    constructor(props) {
        this.db = getFirebaseApp().firestore()
        this.functionsURL = process.env.REACT_APP_FUNCTIONS_API
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
        return await this.habitsCollection.add(habit)
    }

    decodeImageWithHabits = async (file) => {
        const token = await this.userStore.getUserIdToken()
        const form = new FormData()
        form.set('file', file)
        const res = await fetch(`${this.functionsURL}/decodeFileText`, {
            method: 'POST',
            body: form,
            headers: { token }
        })
        if (!res.ok) {
            throw res
        }
        return res
    }
}
