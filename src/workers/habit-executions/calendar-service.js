import dayjs from 'dayjs'
import { CALENDAR_DATE_FORMAT, executionTypeToColorNumber } from './config'
import { executionType, EXECUTION_CREATED_AT_FORMAT } from '../../stores/habits/habit-execution/utils'
import { iterateByYear, iterateByDay } from './utils'
import { ChartService } from './chart-service'

class CalendarService extends ChartService {
    getStartEndYears = () => {
        const startYear = dayjs(this.habit.createdAt).startOf('year')
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
                from: new Date(date.startOf('year').toISOString()),
                to: new Date(date.endOf('year').toISOString()),
                data: []
            })
        })
        return years
    }

    createYearsMap = (yarsRange) => {
        return new Map(yarsRange.map((data) => [data.year, data]))
    }

    getCalendarData = () => {
        const createAtDate = dayjs(this.habit.createdAt)
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
    const calendarService = new CalendarService(habit, executionsMap)
    return {
        data: calendarService.getCalendarData()
    }
}
