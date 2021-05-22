import { createStyles, IconButton, Tooltip, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { executionType } from '../../../stores/habits/habit-execution/utils'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AdjustIcon from '@material-ui/icons/Adjust'
import RemoveIcon from '@material-ui/icons/Remove'
import { useLongPress } from '../../common/hooks/use-long-press'

const styles = (theme) => {
    return createStyles({
        executedBtn: {
            color: theme.habit.executed
        }
    })
}

const HabitExecutionBtnPure = (props) => {
    const { classes, habit, habitExecutionStore } = props
    const {
        onExecutionLongPress,
        onExecutionClick,
        getTodaysExecutionByHabitId,
        getTodaysHabitExecutionType
    } = habitExecutionStore
    const selectedExecutionType = getTodaysHabitExecutionType(habit)

    const onLongPress = async () => {
        const execution = getTodaysExecutionByHabitId(habit.id)
        await onExecutionLongPress(habit, execution)
    }
    const onClick = async () => {
        const execution = getTodaysExecutionByHabitId(habit.id)
        await onExecutionClick(habit, execution)
    }
    const btnProps = useLongPress({ onClick, onLongPress })

    return (
        <>
            {selectedExecutionType === executionType.EXECUTED && (
                <Tooltip key='action' title='Done'>
                    <IconButton {...btnProps} className={classes.executedBtn}>
                        <CheckCircleIcon />
                    </IconButton>
                </Tooltip>
            )}
            {selectedExecutionType === executionType.NOT_EXECUTED && (
                <Tooltip key='action' title='Not done'>
                    <IconButton {...btnProps}>
                        <RadioButtonUncheckedIcon />
                    </IconButton>
                </Tooltip>
            )}
            {selectedExecutionType === executionType.OPTIONAL && (
                <Tooltip key='action' title='Optional'>
                    <IconButton {...btnProps}>
                        <AdjustIcon />
                    </IconButton>
                </Tooltip>
            )}
            {selectedExecutionType === executionType.SKIPPED && (
                <Tooltip key='action' title='Skipped'>
                    <IconButton {...btnProps}>
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
            )}
        </>
    )
}

const HabitExecutionBtn = flowRight(
    withStyles(styles),
    inject('habitExecutionStore'),
    observer
)(HabitExecutionBtnPure)

export { HabitExecutionBtn }
