import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { OverviewChart } from './overview-chart'

const styles = (theme) => {
    return createStyles({})
}

class HabitChartsPure extends React.Component {
    render() {
        return (
            <>
                <OverviewChart />
            </>
        )
    }
}

export const HabitCharts = flowRight(withStyles(styles), observer)(HabitChartsPure)
