import dayjs from 'dayjs'
import { HABIT_CREATED_AT_FORMAT } from '../../stores/habits/utils'
import { SCORE_PER_DAY, SCORE_CHART_MONTH_FORMAT } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { iterateByDay, normalizeScore } from './utils'
import { ChartService } from './chart-service'

class ScoreSevice extends ChartService {
    addItem = (monthChart, date, score) => {
        monthChart[0].data.push({
            x: date.format('DD'),
            y: score
        })
    }

    createMonthChartData = (id) => {
        return [
            {
                id,
                data: []
            }
        ]
    }

    getMonthlyChart = (monthlyMap, monthlyData, date) => {
        const formattedDate = date.format(SCORE_CHART_MONTH_FORMAT)
        if (monthlyMap.has(formattedDate)) {
            return monthlyMap.get(formattedDate)
        }
        const monthChart = this.createMonthChartData(formattedDate)
        monthlyData.push(monthChart)
        monthlyMap.set(formattedDate, monthChart)
        return monthChart
    }

    getScoreData = () => {
        const { createdAt } = this.habit
        const createdAtDate = dayjs(createdAt, HABIT_CREATED_AT_FORMAT)
        const endDate = dayjs()
        const monthlyData = []
        const monthlyMap = new Map()
        let score = 0
        iterateByDay(
            createdAtDate,
            endDate
        )((date) => {
            const monthChart = this.getMonthlyChart(monthlyMap, monthlyData, date)
            const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
            const weekday = date.isoWeekday()
            const execution = this.executionsMap.get(formattedDate)
            if (execution?.type === executionType.EXECUTED) {
                score = normalizeScore(score + SCORE_PER_DAY)
                this.addItem(monthChart, date, score)
                return
            }
            if (execution?.type === executionType.SKIPPED) {
                this.addItem(monthChart, date, score)
                return
            }
            if (this.executionDaysSet.has(weekday)) {
                score = normalizeScore(score - SCORE_PER_DAY)
                this.addItem(monthChart, date, score)
                return
            }
            this.addItem(monthChart, date, score)
        })
        return monthlyData
    }
}

export const getScoreData = (habit, executionsMap) => {
    const calendarSevice = new ScoreSevice(habit, executionsMap)
    return calendarSevice.getScoreData()
}
