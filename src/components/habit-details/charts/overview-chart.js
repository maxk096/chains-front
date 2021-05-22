import { Card, createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { OverallScoreCircle } from './overall-score-circle'
import { TrendNumber } from './trend-number'

const styles = (theme) => {
    return createStyles({
        data: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            [theme.breakpoints.down('sm')]: {
                rowGap: 5,
                gridTemplateColumns: 'repeat(2, 1fr)'
            },
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr'
            }
        },
        valueTitle: {
            fontWeight: 'normal'
        },
        value: {},
        dataItem: {
            display: 'flex',
            alignItems: 'center'
        }
    })
}

class OverviewChartPure extends React.Component {
    render() {
        const { habitChartsStore, classes } = this.props
        const { overview } = habitChartsStore.chartData

        if (!overview) {
            return null
        }

        return (
            <Card>
                <Typography variant='h6'>Overview</Typography>
                <div className={classes.data}>
                    <div className={classes.dataItem}>
                        <OverallScoreCircle overallScore={overview.overallScore} />
                        <Typography variant='subtitle2'>
                            <span className={classes.valueTitle}>Overall score: </span>
                            <span className={classes.value}>{overview.overallScore}%</span>
                        </Typography>
                    </div>
                    <div className={classes.dataItem}>
                        <Typography variant='subtitle2'>
                            <span className={classes.valueTitle}>Monthly trend: </span>
                            <span className={classes.value}>
                                <TrendNumber value={overview.monthlyTrend} />
                            </span>
                        </Typography>
                    </div>
                    <div className={classes.dataItem}>
                        <Typography variant='subtitle2'>
                            <span className={classes.valueTitle}>Yearly trend: </span>
                            <span className={classes.value}>
                                <TrendNumber value={overview.yearlyTrend} />
                            </span>
                        </Typography>
                    </div>
                    <div className={classes.dataItem}>
                        <Typography variant='subtitle2'>
                            <span className={classes.valueTitle}>Total executions: </span>
                            <span className={classes.value}>{overview.totalExecutions}</span>
                        </Typography>
                    </div>
                </div>
            </Card>
        )
    }
}

export const OverviewChart = flowRight(
    withStyles(styles),
    inject('habitChartsStore'),
    observer
)(OverviewChartPure)
