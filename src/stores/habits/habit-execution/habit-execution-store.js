import dayjs from 'dayjs'
import { action, makeObservable, observable } from 'mobx'
import { EXECUTION_CREATED_AT_FORMAT, createNewExecution, executionType } from './utils'

export class HabitExecutionStore {
    constructor(props) {
        this.habitsTransport = props.habitsTransport
        this.uiStore = props.uiStore
        this.onExecutionsChangeUnsub = null
        this.isExecutionsInitialized = false
        this.todaysExecutions = null
        makeObservable(this, {
            todaysExecutions: observable,
            isExecutionsInitialized: observable,
            onExecutionsChange: action
        })
    }

    init = () => {
        const today = dayjs().format(EXECUTION_CREATED_AT_FORMAT)
        this.onExecutionsChangeUnsub = this.habitsTransport.executionsCollection
            .where('createdAt', '==', today)
            .onSnapshot({ includeMetadataChanges: true }, this.onExecutionsChange)
    }

    cleanUp = () => {
        this.onExecutionsChangeUnsub()
    }

    onExecutionsChange = (snapshot) => {
        const data = new Map()
        snapshot.forEach((doc) => {
            const execution = { id: doc.id, ...doc.data() }
            data.set(execution.habitId, execution)
        })
        this.todaysExecutions = data
        this.isExecutionsInitialized = true
    }

    getTodaysExecutionByHabitId = (habitId) => {
        return this.todaysExecutions.get(habitId)
    }

    getTodaysHabitExecutionType = (habit) => {
        const execution = this.getTodaysExecutionByHabitId(habit.id)
        const todayIsoWeekday = dayjs().isoWeekday()
        if (execution) {
            return execution.type
        }
        if (habit.executionDays.includes(todayIsoWeekday)) {
            return executionType.NOT_EXECUTED
        }
        return executionType.OPTIONAL
    }

    onExecutionLongPress = async (habit, execution) => {
        try {
            if (execution) {
                await this.habitsTransport.executionsCollection.doc(execution.id).delete()
                return
            }
            const newExecution = createNewExecution(executionType.SKIPPED, habit.id)
            await this.habitsTransport.executionsCollection.add(newExecution)
        } catch (ex) {
            this.uiStore.showSnackbar(ex.message)
        }
    }

    onExecutionClick = async (habit, execution) => {
        try {
            if (execution) {
                await this.habitsTransport.executionsCollection.doc(execution.id).delete()
                return
            }
            const newExecution = createNewExecution(executionType.EXECUTED, habit.id)
            await this.habitsTransport.executionsCollection.add(newExecution)
        } catch (ex) {
            this.uiStore.showSnackbar(ex.message)
        }
    }
}
