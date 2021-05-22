import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'

const styles = (theme) => {
    return createStyles({
        overallSvg: {
            display: 'flex',
            position: 'relative',
            marginRight: 5
        },
        overallCircle: {
            stroke: theme.charts.overallCircleStroke
        },
        overallCircleShadow: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            stroke: theme.charts.overallCircleShadow
        }
    })
}

class OverallScoreCirclePure extends React.Component {
    render() {
        const { overallScore, classes } = this.props
        const svgSize = 40
        const strokeWidth = 5
        const center = svgSize / 2
        const radius = center - 5
        const strokeCircum = 2 * Math.PI * radius
        const strokeDasharray = (overallScore * strokeCircum) / 100

        return (
            <svg className={classes.overallSvg} height={svgSize} width={svgSize}>
                <circle
                    className={classes.overallCircleShadow}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill='transparent'
                    strokeWidth={strokeWidth}
                />
                <circle
                    className={classes.overallCircle}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill='transparent'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeDasharray} 999`}
                />
            </svg>
        )
    }
}

export const OverallScoreCircle = flowRight(withStyles(styles), observer)(OverallScoreCirclePure)
