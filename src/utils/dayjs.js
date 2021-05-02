import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isoWeek)
dayjs.extend(utc)
dayjs.extend(isSameOrBefore)

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
