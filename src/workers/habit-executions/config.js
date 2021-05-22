import { executionType } from '../../stores/habits/habit-execution/utils'

export const SCORE_PER_DAY = 4

export const executionTypeToColorNumber = {
    [executionType.EXECUTED]: 0,
    [executionType.SKIPPED]: 1,
    [executionType.OPTIONAL]: 2
}

export const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD'
export const SCORE_CHART_MONTH_FORMAT = 'YYYY MMM'
