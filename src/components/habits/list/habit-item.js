import { Card, createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { habitCommonStyles } from '../../common-styles'
import { habitIcon } from '../../../stores/habits/icons'
import classNames from 'classnames'
import { getIsoWeekdays } from '../../../utils/dayjs'
import { computed, makeObservable } from 'mobx'
import { habitType } from '../../../stores/habits/utils'
import dayjs from 'dayjs'
import { HabitExecutionBtn } from './habit-execution-btn'

const styles = (theme) => {
    return createStyles({
        ...habitCommonStyles(theme),
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            wordBreak: 'break-word',
            '&:not(:last-child)': {
                marginBottom: 10
            }
        },
        iconModifier: {
            marginRight: 10
        },
        titleWrap: {
            display: 'flex',
            alignItems: 'center',
            flex: 1
        },
        type: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 3
        },
        highlightedDay: {
            fontWeight: 'bold',
            textTransform: 'capitalize'
        }
    })
}

class HabitItemPure extends React.Component {
    constructor(p) {
        super(p)
        this.weekdayFormatTemplate = 'ddd'
        this.weekdays = getIsoWeekdays(this.weekdayFormatTemplate)
        makeObservable(this, {
            executionDayNames: computed
        })
    }

    get executionDayNames() {
        const { habit } = this.props
        const { executionDays } = habit
        return this.weekdays
            .filter((weekday) => executionDays.includes(weekday.number))
            .map((weekday) => weekday.name)
    }

    isDayHighlighted = (name) => {
        return name === dayjs().format(this.weekdayFormatTemplate)
    }

    render() {
        const { classes, habit } = this.props
        const { type } = habit
        const HabitIcon = habitIcon[habit.icon]
        const iconClassName = classNames(classes.icon, classes.iconModifier)

        return (
            <Card className={classes.root} elevation={3}>
                <div className={classes.titleWrap}>
                    {HabitIcon ? (
                        <HabitIcon className={iconClassName} />
                    ) : (
                        <div className={iconClassName}></div>
                    )}
                    <div>
                        <Typography variant='subtitle2'>{habit.name}</Typography>
                        <Typography variant='body2'>
                            {this.executionDayNames.reduce((prev, name) => [
                                prev,
                                ', ',
                                <span
                                    key={name}
                                    className={classNames({
                                        [classes.highlightedDay]: this.isDayHighlighted(name)
                                    })}
                                >
                                    {name}
                                </span>
                            ])}
                        </Typography>
                    </div>
                </div>
                <HabitExecutionBtn habit={habit} />
                <div
                    className={classNames({
                        [classes.type]: true,
                        [classes.buildType]: type === habitType.BUILD,
                        [classes.breakType]: type === habitType.BREAK
                    })}
                ></div>
            </Card>
        )
    }
}

const HabitItem = flowRight(withStyles(styles), observer)(HabitItemPure)

export { HabitItem }