import { computed, makeObservable } from 'mobx'
import { getFirebaseApp } from '.'
import { createHabitCreatedAt } from '../stores/habits/utils'

export class HabitsTransport {
    constructor(props) {
        this.functionsURL = process.env.REACT_APP_FUNCTIONS_API
        this.userStore = props.userStore
        makeObservable(this, {
            userId: computed,
            habitsCollection: computed
        })
    }

    get db() {
        return getFirebaseApp().firestore()
    }

    get userId() {
        return this.userStore.user?.uid
    }

    get habitsCollection() {
        return this.db.collection('app').doc('habits').collection(this.userId)
    }

    get executionsCollection() {
        return this.db.collection('app').doc('executions').collection(this.userId)
    }

    createHabit = async (habit) => {
        return await this.habitsCollection.add({
            ...habit,
            createdAt: createHabitCreatedAt()
        })
    }

    updateHabit = async (habit) => {
        return await this.habitsCollection.doc(habit.id).update(habit)
    }

    deleteHabit = async (habitId) => {
        const habitDocRef = this.habitsCollection.doc(habitId)
        const executionsSnapshot = await this.executionsCollection.where('habitId', '==', habitId).get()
        const batch = this.db.batch()
        batch.delete(habitDocRef)
        executionsSnapshot.forEach((doc) => {
            batch.delete(doc.ref)
        })
        return await batch.commit()
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
