import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { EditHabit } from '../edit-habit/edit-habit'
import { createStyles, Modal, withStyles } from '@material-ui/core'

const styles = (theme) => {
    return createStyles({
        content: {
            height: '100%',
            outline: 'none'
        }
    })
}

const HabitEditModalPure = (props) => {
    const { habitEditStore, classes } = props
    const { onSubmit, getInitialValues, formProps, isOpen } = habitEditStore

    return (
        <Modal open={isOpen}>
            <div className={classes.content}>
                <EditHabit formProps={formProps} onSubmit={onSubmit} getInitialValues={getInitialValues} />
            </div>
        </Modal>
    )
}

export const HabitEditModal = flowRight(
    inject('habitEditStore'),
    withStyles(styles),
    observer
)(HabitEditModalPure)
