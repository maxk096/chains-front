import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import { getOverviewData } from './overview'
import { getCalendarData } from './calendar'

const exposedObj = {
    getOverviewData,
    getCalendarData
}

expose(exposedObj)
