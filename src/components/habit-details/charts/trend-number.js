import { createStyles, Tooltip, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const styles = (theme) => {
    return createStyles({
        positive: {
            color: theme.charts.positive
        },
        negative: {
            color: theme.charts.negative
        },
        nan: {
            fontSize: '1rem'
        }
    })
}

class TrendNumberPure extends React.Component {
    render() {
        const { classes, value } = this.props

        if (isNaN(value)) {
            return (
                <Tooltip title='Insufficient data to display the trend.' enterTouchDelay={0} placement='top'>
                    <InfoOutlinedIcon className={classes.nan} />
                </Tooltip>
            )
        }

        if (value >= 0) {
            return <span className={classes.positive}>+{value}%</span>
        }

        return <span className={classes.negative}>{value}%</span>
    }
}

export const TrendNumber = flowRight(withStyles(styles), observer)(TrendNumberPure)
