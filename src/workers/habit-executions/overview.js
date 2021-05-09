import dayjs from 'dayjs'
import { HABIT_CREATED_AT_FORMAT } from '../../stores/habits/utils'
import { PERCENTAGE_SCORE_PER_DAY } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { createExecutionDaysSet, iterateByDay } from './utils'

const normalizeScore = (value) => {
    return Math.max(Math.min(value, 100), 0)
}

const getOverallPercentageScore = (habit, executionsMap) => {
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
            overallPercentageScore = normalizeScore(overallPercentageScore + PERCENTAGE_SCORE_PER_DAY)
            return
        }
        if (execution?.type === executionType.SKIPPED) {
            return
        }
        if (executionDaysSet.has(weekday)) {
            overallPercentageScore = normalizeScore(overallPercentageScore - PERCENTAGE_SCORE_PER_DAY)
        }
    })
    return overallPercentageScore
}

const getTotalExecutions = (executionsMap) => {
    return [...executionsMap.values()].filter((execution) => execution.type === executionType.EXECUTED).length
}

export const getOverviewData = (habit, executionsMap) => {
    const values = {
        totalExecutions: getTotalExecutions(executionsMap),
        overallPercentageScore: getOverallPercentageScore(habit, executionsMap)
    }
    return values
}
