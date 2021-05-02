import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import dayjs from 'dayjs'
import { HABIT_CREATED_AT_FORMAT } from '../../stores/habits/utils'
import { PERCENTAGE_SCORE_PER_DAY } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'

const iterateByDay = (start, end) => (cb) => {
    let currentDate = start.clone()
    for (; currentDate.isSameOrBefore(end, 'day'); currentDate = currentDate.add(1, 'day')) {
        cb(currentDate, start, end)
    }
}

const createExecutionDaysSet = (executionDays) => new Set(executionDays)

const normalizeScore = (value) => {
    return Math.max(Math.min(value, 100), 0)
}

const getTotalValues = (habit, executionsMap) => {
    const { executionDays, createdAt } = habit
    const createdAtDate = dayjs(createdAt, HABIT_CREATED_AT_FORMAT)
    const executionDaysSet = createExecutionDaysSet(executionDays)
    const endDate = dayjs()
    let overallPercentageScore = 0
    iterateByDay(
        createdAtDate,
        endDate
    )((date) => {
        const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
        const weekday = date.isoWeekday()
        const execution = executionsMap.get(formattedDate)
        if (execution?.type === executionType.EXECUTED) {
            overallPercentageScore += PERCENTAGE_SCORE_PER_DAY
            return
        }
        if (execution?.type === executionType.SKIPPED) {
            return
        }
        if (executionDaysSet.has(weekday)) {
            overallPercentageScore -= PERCENTAGE_SCORE_PER_DAY
        }
    })
    const totalExecutions = executionsMap.size
    const values = {
        totalExecutions,
        overallPercentageScore: normalizeScore(overallPercentageScore)
    }
    return values
}

const executionsService = {
    getTotalValues
}

expose(executionsService)
