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
        this.startTickIfNeeded()
        this.isInitialized = true
    }

    cleanUp = () => {
        this.stopTick()
    }

    subToDayChange = (subscriber) => {
        this.subscribers.add(subscriber)
        this.startTickIfNeeded()
        return this.createSubscriberDisposer(subscriber)
    }

    createSubscriberDisposer = (subscriber) => () => {
        this.subscribers.delete(subscriber)
        this.stopTickIfNeeded()
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

    startTickIfNeeded = () => {
        if (this.subscribers.size && this.intervalId === null) {
            this.intervalId = setInterval(this.onTick, 1_000)
        }
    }

    stopTickIfNeeded = () => {
        if (!this.subscribers.size) {
            this.stopTick()
        }
    }

    stopTick = () => {
        clearInterval(this.intervalId)
        this.intervalId = null
    }
}
