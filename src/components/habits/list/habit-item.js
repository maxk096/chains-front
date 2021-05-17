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
import { HabitEditBtn } from '../edit-habit/habit-edit-btn'
import { HabitEditModal } from '../edit-habit/habit-edit-modal'
import { DeleteHabitBtn } from '../delete-habit/delete-habit-btn'
import { DeleteHabitModal } from '../delete-habit/delete-habit-modal'

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
        },
        details: {
            marginTop: 5
        },
        habitName: {
            display: 'inline-block'
        },
        actions: {
            display: 'flex',
            gap: '10px',
            height: '100%',
            marginLeft: 10,
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column'
            }
        }
    })
}

class HabitItemPure extends React.Component {
    static defaultProps = {
        detailedView: false,
        showExecution: true,
        showEdit: false,
        showDelete: false
    }

    constructor(p) {
        super(p)
        this.weekdayFormatTemplate = 'ddd'
        this.weekdays = getIsoWeekdays(this.weekdayFormatTemplate)
        makeObservable(this, {
            executionDays: computed
        })
    }

    get executionDays() {
        const { habit } = this.props
        const { executionDays } = habit
        return this.weekdays.filter((weekday) => executionDays.includes(weekday.number))
    }

    isDayHighlighted = (name) => {
        return name === dayjs().format(this.weekdayFormatTemplate)
    }

    render() {
        const {
            classes,
            habit,
            detailedView,
            showExecution,
            onClick,
            onTitleClick,
            showEdit,
            showDelete,
            className
        } = this.props
        const { type, question, reason } = habit
        const HabitIcon = habitIcon[habit.icon]
        const iconClassName = classNames(classes.icon, classes.iconModifier)
        const hasQuestion = !!question
        const hasReason = !!reason
        const shouldShowDetails = detailedView && (hasQuestion || hasReason)
        const shouldShowActions = showExecution || showEdit || showDelete

        return (
            <Card className={classNames(classes.root, className)} elevation={3} onClick={onClick}>
                <div className={classes.titleWrap}>
                    {HabitIcon ? (
                        <HabitIcon className={iconClassName} />
                    ) : (
                        <div className={iconClassName}></div>
                    )}
                    <div>
                        <Typography className={classes.habitName} onClick={onTitleClick} variant='subtitle2'>
                            {habit.name}
                        </Typography>
                        <Typography variant='body2'>
                            {this.executionDays.map((day, index) => [
                                <React.Fragment key={day.number}>
                                    <span
                                        className={classNames({
                                            [classes.highlightedDay]: this.isDayHighlighted(day.name)
                                        })}
                                    >
                                        {day.name}
                                    </span>
                                    {this.executionDays.length - 1 === index ? '' : ', '}
                                </React.Fragment>
                            ])}
                        </Typography>
                        {shouldShowDetails && (
                            <div className={classes.details}>
                                {hasQuestion && (
                                    <Typography variant='body2'>
                                        <b>Question:</b> {question}
                                    </Typography>
                                )}
                                {hasReason && (
                                    <Typography variant='body2'>
                                        <b>Reason:</b> {reason}
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {shouldShowActions && (
                    <div className={classes.actions}>
                        {showDelete && <DeleteHabitBtn habit={habit} />}
                        {showEdit && <HabitEditBtn habit={habit} />}
                        {showExecution && <HabitExecutionBtn habit={habit} />}
                    </div>
                )}
                {showDelete && <DeleteHabitModal />}
                {showEdit && <HabitEditModal />}
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
