import { IconButton, Tooltip } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteHabitBtnPure = (props) => {
    const { habit, deleteHabitStore, connectionStateStore } = props
    const { openDeleteHabit } = deleteHabitStore
    const { isOnline } = connectionStateStore

    const onClick = () => {
        openDeleteHabit(habit)
    }

    return (
        <Tooltip title='Delete'>
            <IconButton onClick={onClick} disabled={!isOnline}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export const DeleteHabitBtn = flowRight(
    inject('deleteHabitStore', 'connectionStateStore'),
    observer
)(DeleteHabitBtnPure)
