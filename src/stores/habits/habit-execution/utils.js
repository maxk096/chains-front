import dayjs from 'dayjs'

export const EXECUTION_CREATED_AT_FORMAT = 'YYYY-MM-DD'

export const executionType = {
    EXECUTED: 'EXECUTED',
    NOT_EXECUTED: 'NOT_EXECUTED',
    SKIPPED: 'SKIPPED',
    OPTIONAL: 'OPTIONAL'
}

export const createNewExecution = (type, habitId) => {
    return {
        type,
        habitId,
        createdAt: dayjs().format(EXECUTION_CREATED_AT_FORMAT)
    }
}
