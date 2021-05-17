import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import { getOverviewData } from './overview-service'
import { getCalendarData } from './calendar-service'
import { getScoreData } from './score-service'

const exposedObj = {
    getOverviewData,
    getCalendarData,
    getScoreData
}

expose(exposedObj)
