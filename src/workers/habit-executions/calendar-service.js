import dayjs from 'dayjs'
import { HABIT_CREATED_AT_FORMAT } from '../../stores/habits/utils'
import { CALENDAR_DATE_FORMAT, executionTypeToColorNumber } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { iterateByYear, iterateByDay } from './utils'
import { ChartService } from './chart-service'

class CalendarSevice extends ChartService {
    getStartEndYears = () => {
        const startYear = dayjs(this.habit.createdAt, HABIT_CREATED_AT_FORMAT).startOf('year')
        const endYear = dayjs().endOf('year')
        return { startYear, endYear }
    }

    getYearsRange = (startYear, endYear) => {
        const years = []
        iterateByYear(
            startYear,
            endYear
        )((date) => {
            years.push({
                year: date.format('YYYY'),
                from: date.startOf('year').format(CALENDAR_DATE_FORMAT),
                to: date.endOf('year').format(CALENDAR_DATE_FORMAT),
                data: []
            })
        })
        return years
    }

    createYearsMap = (yarsRange) => {
        return new Map(yarsRange.map((data) => [data.year, data]))
    }

    getCalendarData = () => {
        const createAtDate = dayjs(this.habit.createdAt, HABIT_CREATED_AT_FORMAT)
        const todayDate = dayjs()
        const { startYear, endYear } = this.getStartEndYears()
        const yarsRange = this.getYearsRange(startYear, endYear)
        const years = this.createYearsMap(yarsRange)
        iterateByDay(
            createAtDate,
            todayDate
        )((date) => {
            const formattedYear = date.format('YYYY')
            const year = years.get(formattedYear)
            const formattedDate = date.format(EXECUTION_CREATED_AT_FORMAT)
            const execution = this.executionsMap.get(formattedDate)
            if (execution) {
                const data = {
                    day: date.format(CALENDAR_DATE_FORMAT),
                    value: executionTypeToColorNumber[execution.type]
                }
                year.data.push(data)
                return
            }
            const weekday = date.isoWeekday()
            if (!this.executionDaysSet.has(weekday)) {
                const data = {
                    day: date.format(CALENDAR_DATE_FORMAT),
                    value: executionTypeToColorNumber[executionType.OPTIONAL]
                }
                year.data.push(data)
            }
        })
        return yarsRange
    }
}

export const getCalendarData = (habit, executionsMap) => {
    const calendarSevice = new CalendarSevice(habit, executionsMap)
    return {
        data: calendarSevice.getCalendarData()
    }
}
