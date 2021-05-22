import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'

const styles = (theme) => {
    return createStyles({
        positive: {
            color: theme.charts.positive
        },
        negative: {
            color: theme.charts.negative
        }
    })
}

class TrendNumberPure extends React.Component {
    render() {
        const { classes, value } = this.props

        if (value >= 0) {
            return <span className={classes.positive}>+{value}%</span>
        }

        return <span className={classes.negative}>{value}%</span>
    }
}

export const TrendNumber = flowRight(withStyles(styles), observer)(TrendNumberPure)
