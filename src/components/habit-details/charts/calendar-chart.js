import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, Card, withStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { Calendars } from './calendars'
import { scrollbarStyles } from './styles'
import classNames from 'classnames'

export const CALENDAR_WIDTH = 880
export const CALENDAR_HEIGHT = 180

const styles = (theme) => {
    return createStyles({
        ...scrollbarStyles(theme),
        root: {
            height: CALENDAR_HEIGHT
        },
        calendarsWrap: {
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex'
        },
        tooltipRoot: {
            padding: 4
        },
        tooltipSpacerStart: {
            width: 70,
            flexShrink: 0
        },
        tooltipSpacerEnd: {
            width: 110,
            flexShrink: 0
        }
    })
}

class CalendarChartPure extends React.Component {
    render() {
        const { classes, habitChartsStore } = this.props
        const { calendar } = habitChartsStore.chartData

        if (!calendar) {
            return null
        }

        return (
            <Card>
                <Typography variant='h6'>Calendar</Typography>
                <div className={classes.root}>
                    <div className={classNames(classes.calendarsWrap, classes.withScrollbar)}>
                        <div className={classes.tooltipSpacerStart}></div>
                        <Calendars calendar={calendar} />
                        <div className={classes.tooltipSpacerEnd}></div>
                    </div>
                </div>
            </Card>
        )
    }
}

export const CalendarChart = flowRight(
    withStyles(styles),
    inject('habitChartsStore'),
    observer
)(CalendarChartPure)
