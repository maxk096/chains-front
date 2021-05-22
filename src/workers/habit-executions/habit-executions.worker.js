import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import { getOverviewData } from './overview-service'
import { getCalendarData } from './calendar-service'
import { getScoreData } from './score-service'
import { getYearExecutionsData } from './year-executions-service'

const exposedObj = {
    getOverviewData,
    getCalendarData,
    getScoreData,
    getYearExecutionsData
}

expose(exposedObj)
