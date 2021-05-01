import { IconButton, Tooltip } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import EditIcon from '@material-ui/icons/Edit'

const HabitEditBtnPure = (props) => {
    const { habit, habitEditStore } = props
    const { openEditHabit } = habitEditStore

    const onClick = () => {
        openEditHabit(habit)
    }

    return (
        <Tooltip title='Edit'>
            <IconButton onClick={onClick}>
                <EditIcon />
            </IconButton>
        </Tooltip>
    )
}

export const HabitEditBtn = flowRight(inject('habitEditStore'), observer)(HabitEditBtnPure)
