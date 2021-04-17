import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)
dayjs.extend(utc)

export const getIsoWeekdays = (template = 'ddd') => {
    const weekdays = []
    let day = dayjs().startOf('day').isoWeekday(1)
    for (let number = 1; number <= 7; number++) {
        weekdays.push({
            number,
            name: day.format(template)
        })
        day = day.add(1, 'day')
    }
    return weekdays
}
