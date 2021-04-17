import { createStyles, Modal, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { modalState } from '../../../stores/habits/add-new-habit/utils'
import { EditHabit } from '../edit-habit/edit-habit'

const styles = (theme) => {
    return createStyles({})
}

class AddNewHabitModalPure extends React.Component {
    render() {
        const { addNewHabitStore } = this.props
        const { isOpen, state } = addNewHabitStore

        return (
            <Modal open={isOpen}>
                <>{modalState.ADD_NEW_HABIT === state && <EditHabit />}</>
            </Modal>
        )
    }
}

const AddNewHabitModal = flowRight(
    withStyles(styles),
    inject('addNewHabitStore'),
    observer
)(AddNewHabitModalPure)

export { AddNewHabitModal }
