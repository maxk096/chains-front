import { action, flow, makeObservable, observable, reaction, toJS } from 'mobx'

export class HabitChartsStore {
    constructor(props) {
        this.executionsWorker = props.executionsWorker
        this.habitsTransport = props.habitsTransport
        this.habitDetailsStore = props.habitDetailsStore
        this.dayObserverStore = props.dayObserverStore
        this.uiStore = props.uiStore
        this.habitId = props.habitId
        this.onExecutionsChangeUnsub = null
        this.onHabitChangeUnsub = null
        this.isExecutionsInitialized = false
        this.currentUpdateChartsPromise = null
        this.executionsMap = null
        this.dayChangeUnsub = null
        this.chartData = {
            overview: null,
            calendar: null,
            score: null,
            yearExecutions: null
        }
        makeObservable(this, {
            executionsMap: observable,
            isExecutionsInitialized: observable,
            onExecutionsChange: action,
            handleUpdateCharts: flow,
            chartData: observable
        })
    }

    init = () => {
        this.subscribeToExecutions()
        this.dayChangeUnsub = this.dayObserverStore.subToDayChange(this.onDayChange)
        this.onHabitChangeUnsub = reaction(() => this.habitDetailsStore.habit, this.onHabitChange, {
            fireImmediately: true
        })
    }

    cleanUp = () => {
        this.onHabitChangeUnsub()
        this.dayChangeUnsub()
        this.onExecutionsChangeUnsub()
    }

    onDayChange = () => {
        this.onExecutionsChangeUnsub()
        this.subscribeToExecutions()
    }

    subscribeToExecutions = () => {
        this.onExecutionsChangeUnsub = this.habitsTransport.executionsCollection
            .where('habitId', '==', this.habitId)
            .onSnapshot(this.onExecutionsChange)
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
            this.chartData.overview = yield this.executionsWorker.getOverviewData(habit, executionsMap)
            this.chartData.calendar = yield this.executionsWorker.getCalendarData(habit, executionsMap)
            this.chartData.score = yield this.executionsWorker.getScoreData(habit, executionsMap)
            this.chartData.yearExecutions = yield this.executionsWorker.getYearExecutionsData(
                habit,
                executionsMap
            )
        } catch (ex) {
            this.uiStore.showSnackbar('error', ex.message)
        }
    }
}
