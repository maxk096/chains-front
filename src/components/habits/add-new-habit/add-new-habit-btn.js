import { Backdrop, createStyles, withStyles } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import { flowRight } from 'lodash'
import React, { useState } from 'react'
import CreateIcon from '@material-ui/icons/Create'
import { inject, observer } from 'mobx-react'
import { modalState } from '../../../stores/habits/add-new-habit/utils'

const styles = (theme) => {
    return createStyles({
        speedDial: {
            position: 'absolute',
            bottom: 50,
            right: 50,
            zIndex: 1200,
            [theme.breakpoints.down('sm')]: {
                bottom: 20,
                right: 20
            }
        },
        staticTooltipLabel: {
            whiteSpace: 'nowrap'
        },
        backdrop: {
            zIndex: 1150
        }
    })
}

const actions = [
    {
        key: modalState.ADD_NEW_HABIT,
        icon: <CreateIcon />,
        name: 'New habit'
    }
]

const AddNewHabitBtnPure = (props) => {
    const { classes, addNewHabitStore } = props
    const [isOpen, setIsOpen] = useState(false)
    const { openAddNewHabit } = addNewHabitStore
    const openDial = () => setIsOpen(true)
    const closeDial = () => setIsOpen(false)

    return (
        <>
            <Backdrop open={isOpen} className={classes.backdrop} />
            <SpeedDial
                ariaLabel='new-habit'
                direction='up'
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={closeDial}
                onOpen={openDial}
                open={isOpen}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        className={classes.action}
                        classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
                        key={action.key}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => openAddNewHabit(action.key)}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

const AddNewHabitBtn = flowRight(withStyles(styles), inject('addNewHabitStore'), observer)(AddNewHabitBtnPure)

export { AddNewHabitBtn }
