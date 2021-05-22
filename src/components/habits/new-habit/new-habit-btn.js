import { Backdrop, createStyles, withStyles } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import { flowRight } from 'lodash'
import React, { useState } from 'react'
import CreateIcon from '@material-ui/icons/Create'
import { inject, observer } from 'mobx-react'
import { modalState } from '../../../stores/habits/new-habit/new-habit-modal'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import ViewListIcon from '@material-ui/icons/ViewList'

export const NEW_HABIT_BTN_RESERVED_HEIGHT = 90

const styles = (theme) => {
    return createStyles({
        speedDial: {
            position: 'fixed',
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
        key: modalState.NEW_HABIT,
        icon: <CreateIcon />,
        name: 'New habit'
    },
    {
        key: modalState.ADD_NEW_FROM_PHOTO,
        icon: <PhotoCameraIcon />,
        name: 'Upload from photo'
    },
    {
        key: modalState.PREDEFINED_HABITS,
        icon: <ViewListIcon />,
        name: 'Choose from predefined list'
    }
]

const NewHabitBtnPure = (props) => {
    const { classes, newHabitModalStore, connectionStateStore } = props
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
    const { isOnline } = connectionStateStore
    const { openNewHabitModal, isOpen } = newHabitModalStore
    const openDial = () => setIsSpeedDialOpen(true)
    const closeDial = () => setIsSpeedDialOpen(false)

    const onDialActionClick = (key) => () => {
        openNewHabitModal(key)
        closeDial()
    }

    if (isOpen) {
        return null
    }

    return (
        <>
            <Backdrop open={isSpeedDialOpen} className={classes.backdrop} />
            <SpeedDial
                ariaLabel='new-habit'
                direction='up'
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={closeDial}
                onOpen={openDial}
                open={isSpeedDialOpen}
                FabProps={{ disabled: !isOnline }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        className={classes.action}
                        classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
                        key={action.key}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={onDialActionClick(action.key)}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

const NewHabitBtn = flowRight(
    withStyles(styles),
    inject('newHabitModalStore', 'connectionStateStore'),
    observer
)(NewHabitBtnPure)

export { NewHabitBtn }
