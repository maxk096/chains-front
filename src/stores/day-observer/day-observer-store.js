import dayjs from 'dayjs'
import { action, makeObservable, observable } from 'mobx'

export class DayObserverStore {
    constructor() {
        this.observedDate = null
        this.subscribers = new Set()
        this.intervalId = null
        this.isInitialized = false
        makeObservable(this, {
            observedDate: observable,
            onTick: action,
            isInitialized: observable
        })
    }

    init = () => {
        this.observedDate = dayjs()
        this.intervalId = setInterval(this.onTick, 1_000)
        this.isInitialized = true
    }

    cleanUp = () => {
        clearInterval(this.intervalId)
    }

    subToDayChange = (subscriber) => {
        this.subscribers.add(subscriber)
        return this.createSubscriberDisposer(subscriber)
    }

    createSubscriberDisposer = (subscriber) => () => {
        this.subscribers.delete(subscriber)
    }

    onTick = () => {
        const todayDate = dayjs()
        if (!this.observedDate.isSame(todayDate, 'day')) {
            this.observedDate = todayDate
            this.subscribers.forEach((subscriber) => {
                subscriber()
            })
        }
    }
}
