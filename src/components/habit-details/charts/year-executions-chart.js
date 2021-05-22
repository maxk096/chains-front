import React from 'react'
import { Bar } from '@nivo/bar'
import AutoSizer from 'react-virtualized-auto-sizer'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { Card, createStyles, Typography, withStyles, IconButton, withTheme } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
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

class YearExecutionsChartPure extends React.Component {
    constructor(props) {
        super(props)
        const { habitChartsStore } = this.props
        this.yearIndex = null
        makeObservable(this, {
            yearIndex: observable,
            onYearExecutionsChange: action,
            goToNextYear: action,
            goToPrevYear: action,
            currentYear: computed
        })
        this.onYearExecutionsChangeUnsub = reaction(
            () => habitChartsStore.chartData?.yearExecutions,
            this.onYearExecutionsChange
        )
    }

    get currentYear() {
        const { habitChartsStore } = this.props
        return habitChartsStore.chartData.yearExecutions?.[this.yearIndex]
    }

    componentWillUnmount() {
        this.onYearExecutionsChangeUnsub()
    }

    isInYearRange = (yearIndex) => {
        const { habitChartsStore } = this.props
        return yearIndex >= 0 && yearIndex < habitChartsStore.chartData.yearExecutions.length
    }

    onYearExecutionsChange = (score) => {
        if (this.yearIndex === null || !this.isInYearRange(this.yearIndex)) {
            this.yearIndex = score.length - 1
        }
    }

    goToNextYear = () => {
        this.yearIndex++
    }

    goToPrevYear = () => {
        this.yearIndex--
    }

    computeChartWidth = (parentWidth) => {
        const dataPointWidth = 30
        const computedWidth = 200 + this.currentYear.data.length * dataPointWidth
        return Math.max(parentWidth, computedWidth)
    }

    tooltip = ({ data }) => {
        const{classes} =this.props
        const { month, total } = data
        return (
            <div className={classes.tooltip}>
                <span>{month}: </span>
                <strong>{total}</strong>
            </div>
        )
    }

    render() {
        const { habitChartsStore, classes, theme } = this.props
        const { yearExecutions } = habitChartsStore.chartData

        if (!yearExecutions) {
            return null
        }

        return (
            <Card>
                <div className={classes.title}>
                    <Typography variant='h6'>Total executions</Typography>
                    <div className={classes.stepper}>
                        <IconButton
                            disabled={!this.isInYearRange(this.yearIndex - 1)}
                            onClick={this.goToPrevYear}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <span>{this.currentYear.year}</span>
                        <IconButton
                            disabled={!this.isInYearRange(this.yearIndex + 1)}
                            onClick={this.goToNextYear}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={classNames(classes.chartWrap, classes.withScrollbar)}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <Bar
                                width={this.computeChartWidth(width)}
                                height={height}
                                data={this.currentYear.data}
                                indexBy='month'
                                keys={['total']}
                                padding={0.3}
                                margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
                                colors={[theme.charts.chartColorPrimary]}
                                axisTop={null}
                                axisRight={null}
                                minValue={0}
                                maxValue={31}
                                tooltip={this.tooltip}
                            />
                        )}
                    </AutoSizer>
                </div>
            </Card>
        )
    }
}

export const YearExecutionsChart = flowRight(
    inject('habitChartsStore'),
    withStyles(styles),
    withTheme,
    observer
)(YearExecutionsChartPure)
