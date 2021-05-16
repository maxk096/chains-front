export const iterateByDay = (start, end) => (cb) => {
    let currentDate = start.clone()
    for (; currentDate.isSameOrBefore(end, 'day'); currentDate = currentDate.add(1, 'day')) {
        cb(currentDate, start, end)
    }
}

export const iterateByYear = (start, end) => (cb) => {
    let currentDate = start.clone()
    for (; currentDate.isSameOrBefore(end, 'year'); currentDate = currentDate.add(1, 'year')) {
        cb(currentDate, start, end)
    }
}

export const createExecutionDaysSet = (executionDays) => new Set(executionDays)
