import dayjs from 'dayjs'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { iterateByDay } from './utils'
import { ChartService } from './chart-service'

class YearExecutionsSevice extends ChartService {
    createYearData = (year) => {
        return { year, data: [] }
    }

    createMonthChartData = (month) => {
        return { month, total: 0 }
    }

    getMonthlyChart = (yearlyMap, date) => {
        const year = date.year()
        const month = date.format('MMM')
        if (!yearlyMap.has(year)) {
            const yearData = this.createYearData(year)
            yearlyMap.set(year, yearData)
        }
        const yearData = yearlyMap.get(year)
        const monthData = yearData.data.find((m) => m.month === month)
        if (monthData) {
            return monthData
        }
        const newMonthData = this.createMonthChartData(month)
        yearData.data.push(newMonthData)
        return newMonthData
    }

    getYearExecutionsData = () => {
        const { createdAt } = this.habit
        const createdAtDate = dayjs(createdAt)
        const endDate = dayjs()
        const yearlyMap = new Map()
        iterateByDay(
            createdAtDate,
            endDate
        )((date) => {
            const monthChart = this.getMonthlyChart(yearlyMap, date)
            const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
            const execution = this.executionsMap.get(formattedDate)
            if (execution?.type === executionType.EXECUTED) {
                monthChart.total++
            }
        })
        return [...yearlyMap.values()]
    }
}

export const getYearExecutionsData = (habit, executionsMap) => {
    const yearExecutionsSevice = new YearExecutionsSevice(habit, executionsMap)
    return yearExecutionsSevice.getYearExecutionsData()
}
