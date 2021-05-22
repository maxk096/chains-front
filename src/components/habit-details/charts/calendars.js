import React from 'react'
import { Calendar } from '@nivo/calendar'
import dayjs from 'dayjs'
import { flowRight } from 'lodash'
import { createStyles, withStyles, withTheme } from '@material-ui/core'
import { observer } from 'mobx-react'
import scrollIntoViewifNeeded from 'scroll-into-view-if-needed'
import { executionTypeToColorNumber } from '../../../workers/habit-executions/config'
import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from './calendar-chart'
import { ChartTooltip } from './chart-tooltip'

const styles = (theme) => {
    return createStyles({
        tooltipSpacer: {
            width: 110,
            flexShrink: 0
        }
    })
}

const MONTH_FORMAT = 'YYYY MMM'
const DATE_YEAR_FORMAT = 'YYYY'

const valueToName = {
    [executionTypeToColorNumber.EXECUTED]: 'Done',
    [executionTypeToColorNumber.SKIPPED]: 'Skipped',
    [executionTypeToColorNumber.OPTIONAL]: 'Optional'
}

class CalendarsPure extends React.Component {
    componentDidMount() {
        this.scrollCurrentMonthIntoView()
    }

    scrollCurrentMonthIntoView = () => {
        const today = dayjs()
        const year = today.format(DATE_YEAR_FORMAT)
        const month = today.format(MONTH_FORMAT)
        const nodes = document.querySelectorAll(`[data-year="${year}"] text`)
        const currentMonth = [...nodes].find((node) => {
            return node.textContent === month
        })
        if (!currentMonth) {
            return
        }
        scrollIntoViewifNeeded(currentMonth, {
            inline: 'center',
            behavior: (actions) => {
                // Apply scroll only to the scrollable parent of a chart.
                const [chartParentAction] = actions
                const { el, top, left } = chartParentAction
                el.scrollTop = top
                el.scrollLeft = left
            }
        })
    }

    monthLegend = (year, month, date) => {
        const d = dayjs(date)
        return d.format(MONTH_FORMAT)
    }

    tooltip = (item) => {
        const date = dayjs(item.date)
        const isNotDone = typeof item.data.value === 'undefined'
        const text = isNotDone ? 'Not done' : valueToName[item.data.value]
        return (
            <ChartTooltip>
                <span>{date.format('YYYY-MM-DD dddd')}: </span>
                <strong style={{ color: !isNotDone && item.color }}>{text}</strong>
            </ChartTooltip>
        )
    }

    render() {
        const { theme, calendar } = this.props
        const { charts } = theme

        return calendar.data.map((item) => (
            <div key={item.year} data-year={item.year}>
                <Calendar
                    width={CALENDAR_WIDTH}
                    height={CALENDAR_HEIGHT}
                    data={item.data}
                    from={item.from}
                    to={item.to}
                    minValue={0}
                    maxValue={2}
                    emptyColor={charts.notExecuted}
                    colors={[charts.executed, charts.skipped, charts.optional]}
                    margin={{ left: 40 }}
                    monthBorderColor={charts.monthBorderColor}
                    dayBorderWidth={2}
                    dayBorderColor={charts.dayBorderColor}
                    monthSpacing={5}
                    monthLegend={this.monthLegend}
                    tooltip={this.tooltip}
                />
            </div>
        ))
    }
}

export const Calendars = flowRight(withStyles(styles), withTheme, observer)(CalendarsPure)
