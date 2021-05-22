import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, Card, withStyles } from '@material-ui/core'
import { observer } from 'mobx-react'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        tooltipRoot: {
            padding: 4
        }
    })
}

class ChartTooltipPure extends React.Component {
    render() {
        const { children, classes, className } = this.props

        return <Card className={classNames(classes.tooltipRoot, className)}>{children}</Card>
    }
}

export const ChartTooltip = flowRight(withStyles(styles), observer)(ChartTooltipPure)
