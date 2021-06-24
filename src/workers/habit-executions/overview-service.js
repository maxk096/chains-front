import dayjs from 'dayjs'
import { SCORE_PER_DAY } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { iterateByDay, normalizeScore } from './utils'
import { ChartService } from './chart-service'

class OverviewService extends ChartService {
    getTotalExecutions = () => {
        const { createdAt } = this.habit
        const start = dayjs(createdAt)
        const end = dayjs()
        const info = this.getExecutionsInfoByPeriod(start, end)
        return info.totalExecutions
    }

    getExecutionsInfoByPeriod = (start, end) => {
        let totalExecutions = 0
        let notSkippedExecutionDaysInPeriod = 0
        iterateByDay(
            start,
            end
        )((date) => {
            const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
            const execution = this.executionsMap.get(formattedDate)
            const weekday = date.isoWeekday()
            if (execution?.type === executionType.SKIPPED) {
                return
            }
            if (execution?.type === executionType.EXECUTED) {
                totalExecutions++
            }
            if (this.executionDaysSet.has(weekday)) {
                notSkippedExecutionDaysInPeriod++
            }
        })
        return { totalExecutions, notSkippedExecutionDaysInPeriod }
    }

    computeRatio = (current, prev) => {
        const ratio = current / prev
        if (isNaN(ratio) || !isFinite(ratio)) {
            return 0
        }
        return ratio * 100
    }

    formatSimpleNumber = (num) => {
        return Number(num.toFixed(0))
    }

    getPeriodTrend = (period) => {
        const currentPeriodStart = dayjs().subtract(1, period)
        const currentPeriodEnd = dayjs()
        const prevPeriodEnd = currentPeriodStart.subtract(1, 'day')
        const prevPeriodStart = prevPeriodEnd.subtract(1, period)
        const currentPeriodInfo = this.getExecutionsInfoByPeriod(currentPeriodStart, currentPeriodEnd)
        const prevPeriodInfo = this.getExecutionsInfoByPeriod(prevPeriodStart, prevPeriodEnd)
        const currentPeriodRatio = this.computeRatio(
            currentPeriodInfo.totalExecutions,
            currentPeriodInfo.notSkippedExecutionDaysInPeriod
        )
        const prevPeriodRatio = this.computeRatio(
            prevPeriodInfo.totalExecutions,
            prevPeriodInfo.notSkippedExecutionDaysInPeriod
        )
        const periodRatio = this.formatSimpleNumber(currentPeriodRatio - prevPeriodRatio)
        return periodRatio
    }

    getMonthlyTrend = () => {
        return this.getPeriodTrend('month')
    }

    getYearlyTrend = () => {
        return this.getPeriodTrend('year')
    }

    getOverallScore = () => {
        const { createdAt } = this.habit
        const createdAtDate = dayjs(createdAt)
        const endDate = dayjs()
        let overallScore = 0
        iterateByDay(
            createdAtDate,
            endDate
        )((date) => {
            const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
            const weekday = date.isoWeekday()
            const execution = this.executionsMap.get(formattedDate)
            if (execution?.type === executionType.EXECUTED) {
                overallScore = normalizeScore(overallScore + SCORE_PER_DAY)
                return
            }
            if (execution?.type === executionType.SKIPPED) {
                return
            }
            if (this.executionDaysSet.has(weekday)) {
                overallScore = normalizeScore(overallScore - SCORE_PER_DAY)
            }
        })
        return overallScore
    }
}

export const getOverviewData = (habit, executionsMap) => {
    const overviewService = new OverviewService(habit, executionsMap)
    const data = {
        totalExecutions: overviewService.getTotalExecutions(),
        overallScore: overviewService.getOverallScore(),
        monthlyTrend: overviewService.getMonthlyTrend(),
        yearlyTrend: overviewService.getYearlyTrend()
    }
    return data
}
