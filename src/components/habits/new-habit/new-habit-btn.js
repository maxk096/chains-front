import { Backdrop, createStyles, withStyles } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import { flowRight } from 'lodash'
import React, { useState } from 'react'
import CreateIcon from '@material-ui/icons/Create'
import { inject, observer } from 'mobx-react'
import { modalState } from '../../../stores/habits/new-habit/new-habit-modal'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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
        key: modalState.NEW_HABIT,
        icon: <CreateIcon />,
        name: 'New habit'
    },
    {
        key: modalState.ADD_NEW_FROM_PHOTO,
        icon: <PhotoCameraIcon />,
        name: 'Upload from photo'
    }
]

const NewHabitBtnPure = (props) => {
    const { classes, newHabitModalStore } = props
    const [isOpen, setIsOpen] = useState(false)
    const { openNewHabitModal } = newHabitModalStore
    const openDial = () => setIsOpen(true)
    const closeDial = () => setIsOpen(false)

    const onDialActionClick = (key) => () => {
        openNewHabitModal(key)
        closeDial()
    }

    if (newHabitModalStore.isOpen) {
        return null
    }

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
                        onClick={onDialActionClick(action.key)}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

const NewHabitBtn = flowRight(withStyles(styles), inject('newHabitModalStore'), observer)(NewHabitBtnPure)

export { NewHabitBtn }
