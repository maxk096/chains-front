import { createExecutionDaysSet } from './utils'

export class ChartService {
    constructor(habit, executionsMap) {
        this.habit = habit
        this.executionsMap = executionsMap
        this.executionDaysSet = createExecutionDaysSet(habit.executionDays)
    }
}
