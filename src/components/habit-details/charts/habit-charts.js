import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { OverviewChart } from './overview-chart'
import { CalendarChart } from './calendar-chart'

const styles = (theme) => {
    return createStyles({})
}

class HabitChartsPure extends React.Component {
    render() {
        return (
            <>
                <OverviewChart />
                <CalendarChart />
            </>
        )
    }
}

export const HabitCharts = flowRight(withStyles(styles), observer)(HabitChartsPure)
