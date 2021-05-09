import { expose } from 'comlink'
import '../../utils/dayjs'
import '../../utils/validation'
import { getOverviewData } from './overview'

const exposedObj = {
    getOverviewData
}

expose(exposedObj)
