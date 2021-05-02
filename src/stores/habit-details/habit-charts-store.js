import { action, flow, makeObservable, observable, reaction, toJS } from 'mobx'

export class HabitChartsStore {
    constructor(props) {
        this.executionsWorker = props.executionsWorker
        this.habitsTransport = props.habitsTransport
        this.habitDetailsStore = props.habitDetailsStore
        this.uiStore = props.uiStore
        this.habitId = props.habitId
        this.onExecutionsChangeUnsub = null
        this.onHabitChangeUnsub = null
        this.isExecutionsInitialized = false
        this.currentUpdateChartsPromise = null
        this.executionsMap = null
        makeObservable(this, {
            executionsMap: observable,
            isExecutionsInitialized: observable,
            onExecutionsChange: action,
            handleUpdateCharts: flow
        })
    }

    init = () => {
        this.onExecutionsChangeUnsub = this.habitsTransport.executionsCollection
            .where('habitId', '==', this.habitId)
            .onSnapshot(this.onExecutionsChange)
        this.onHabitChangeUnsub = reaction(() => this.habitDetailsStore.habit, this.onHabitChange, {
            fireImmediately: true
        })
    }

    cleanUp = () => {
        this.onExecutionsChangeUnsub()
        this.onHabitChangeUnsub()
    }

    onHabitChange = async () => {
        await this.tryUpdatingCharts()
    }

    onExecutionsChange = async (snapshot) => {
        const data = new Map()
        snapshot.forEach((doc) => {
            const execution = { id: doc.id, ...doc.data() }
            data.set(execution.createdAt, execution)
        })
        this.executionsMap = data
        this.isExecutionsInitialized = true
        await this.tryUpdatingCharts()
    }

    tryUpdatingCharts = async () => {
        try {
            if (!this.habitDetailsStore.habit || !this.executionsMap) {
                return
            }
            if (this.currentUpdateChartsPromise) {
                this.currentUpdateChartsPromise.cancel()
            }
            this.currentUpdateChartsPromise = this.handleUpdateCharts()
            await this.currentUpdateChartsPromise
        } catch (ex) {}
    };

    *handleUpdateCharts() {
        try {
            const habit = toJS(this.habitDetailsStore.habit)
            const executionsMap = toJS(this.executionsMap)
            const res = yield this.executionsWorker.getTotalValues(habit, executionsMap)
            console.log(
                '🚀 ~ file: habit-charts-store.js ~ line 56 ~ HabitChartsStore ~ *handleUpdateCharts ~ res',
                res
            )
        } catch (ex) {
            console.log(
                '🚀 ~ file: habit-charts-store.js ~ line 57 ~ HabitChartsStore ~ *handleUpdateCharts ~ ex',
                ex
            )
        }
    }
}
