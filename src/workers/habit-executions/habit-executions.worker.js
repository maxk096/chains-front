import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import { getOverviewData } from './overview'
import { getCalendarData } from './calendar'
import { getScoreData } from './score'

const exposedObj = {
    getOverviewData,
    getCalendarData,
    getScoreData
}

expose(exposedObj)
