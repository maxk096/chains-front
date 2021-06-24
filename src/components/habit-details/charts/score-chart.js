import React from 'react'
import { Line } from '@nivo/line'
import AutoSizer from 'react-virtualized-auto-sizer'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { Card, createStyles, Typography, withStyles, IconButton, withTheme } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { ChartTooltip } from './chart-tooltip'
import dayjs from 'dayjs'
import { SCORE_CHART_MONTH_FORMAT } from '../../../workers/habit-executions/config'
import { scrollbarStyles } from './styles'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        ...scrollbarStyles(theme),
        title: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        stepper: {
            display: 'flex',
            columnGap: '10px',
            alignItems: 'center'
        },
        tooltip: {
            whiteSpace: 'nowrap'
        },
        chartWrap: {
            width: '100%',
            height: 300,
            overflowX: 'auto',
            overflowY: 'hidden'
        }
    })
}

class ScoreChartPure extends React.Component {
    constructor(props) {
        super(props)
        const { habitChartsStore } = this.props
        this.monthIndex = null
        makeObservable(this, {
            monthIndex: observable,
            onScoreChange: action,
            goToNextMonth: action,
            goToPrevMonth: action,
            currentMonthData: computed,
            chartLine: computed
        })
        this.onScoreChangeUnsub = reaction(() => habitChartsStore.chartData?.score, this.onScoreChange, {
            fireImmediately: true
        })
    }

    get currentMonthData() {
        const { habitChartsStore } = this.props
        return habitChartsStore.chartData.score?.[this.monthIndex]
    }

    get chartLine() {
        return this.currentMonthData?.[0]
    }

    componentWillUnmount() {
        this.onScoreChangeUnsub()
    }

    isInMonthlyRange = (monthIndex) => {
        const { habitChartsStore } = this.props
        return monthIndex >= 0 && monthIndex < habitChartsStore.chartData.score.length
    }

    onScoreChange = (score) => {
        if (!score) {
            return
        }
        if (this.monthIndex === null || !this.isInMonthlyRange(this.monthIndex)) {
            this.monthIndex = score.length - 1
        }
    }

    goToNextMonth = () => {
        this.monthIndex++
    }

    goToPrevMonth = () => {
        this.monthIndex--
    }

    computeLineWidth = (parentWidth) => {
        const dataPointWidth = 20
        const computedWidth = 200 + this.chartLine.data.length * dataPointWidth
        return Math.max(parentWidth, computedWidth)
    }

    tooltip = ({ point }) => {
        const { classes } = this.props
        const chartLine = this.chartLine
        const dataPoint = chartLine.data[point.index]
        const date = dayjs(chartLine.id, SCORE_CHART_MONTH_FORMAT).set('date', dataPoint.x)
        return (
            <ChartTooltip className={classes.tooltip}>
                <span>{date.format('YYYY-MM-DD')}: </span>
                <strong style={{ color: point.serieColor }}>{dataPoint.y}%</strong>
            </ChartTooltip>
        )
    }

    render() {
        const { habitChartsStore, classes, theme } = this.props
        const { score } = habitChartsStore.chartData

        if (!score) {
            return null
        }

        return (
            <Card>
                <div className={classes.title}>
                    <Typography variant='h6'>Score</Typography>
                    <div className={classes.stepper}>
                        <IconButton
                            disabled={!this.isInMonthlyRange(this.monthIndex - 1)}
                            onClick={this.goToPrevMonth}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <span>{this.chartLine.id}</span>
                        <IconButton
                            disabled={!this.isInMonthlyRange(this.monthIndex + 1)}
                            onClick={this.goToNextMonth}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={classNames(classes.chartWrap, classes.withScrollbar)}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <Line
                                width={this.computeLineWidth(width)}
                                height={height}
                                data={this.currentMonthData}
                                margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
                                axisTop={null}
                                axisRight={null}
                                colors={[theme.charts.chartColorPrimary]}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0
                                }}
                                axisLeft={{
                                    format: (v) => `${v}%`
                                }}
                                yScale={{
                                    type: 'linear',
                                    min: 0,
                                    max: 100,
                                    stacked: true,
                                    reverse: false
                                }}
                                tooltip={this.tooltip}
                                pointSize={10}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-12}
                                useMesh={true}
                                enableArea
                            />
                        )}
                    </AutoSizer>
                </div>
            </Card>
        )
    }
}

export const ScoreChart = flowRight(
    inject('habitChartsStore'),
    withStyles(styles),
    withTheme,
    observer
)(ScoreChartPure)
