import { createStyles, IconButton, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { executionType } from '../../../stores/habits/habit-execution/utils'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AdjustIcon from '@material-ui/icons/Adjust'
import RemoveIcon from '@material-ui/icons/Remove'
import { useLongPress } from '../../common/hooks/use-long-press'

const styles = (theme) => {
    return createStyles({
        action: {
            height: '100%',
            marginLeft: 10
        },
        executedBtn: {
            color: theme.habit.executed
        }
    })
}

export const habitExecutionCtx = React.createContext(undefined)

const HabitExecutionBtnPure = (props) => {
    const { classes, habit } = props
    const {
        onExecutionLongPress,
        onExecutionClick,
        getTodaysExecutionByHabitId,
        getTodaysHabitExecutionType
    } = useContext(habitExecutionCtx)
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
        <div className={classes.action}>
            <IconButton
                {...btnProps}
                className={classNames({
                    [classes.executedBtn]: selectedExecutionType === executionType.EXECUTED
                })}
            >
                {selectedExecutionType === executionType.EXECUTED && <CheckCircleIcon />}
                {selectedExecutionType === executionType.NOT_EXECUTED && <RadioButtonUncheckedIcon />}
                {selectedExecutionType === executionType.OPTIONAL && <AdjustIcon />}
                {selectedExecutionType === executionType.SKIPPED && <RemoveIcon />}
            </IconButton>
        </div>
    )
}

const HabitExecutionBtn = flowRight(withStyles(styles), observer)(HabitExecutionBtnPure)

export { HabitExecutionBtn }
