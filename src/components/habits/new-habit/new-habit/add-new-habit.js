import { createStyles, Modal, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { EditHabit } from '../../edit-habit/edit-habit'
import { NewHabitStore } from '../../../../stores/habits/new-habit/new-habit'

const styles = (theme) => {
    return createStyles({
        content: {
            height: '100%',
            outline: 'none'
        }
    })
}

class AddNewHabitModalPure extends React.Component {
    constructor(p) {
        super(p)
        const { transport, newHabitModalStore, uiStore } = this.props
        const { habitsTransport } = transport
        this.newHabitStore = new NewHabitStore({ habitsTransport, newHabitModalStore, uiStore })
    }

    render() {
        const { classes } = this.props
        const { getInitialValues, onSubmit, formProps } = this.newHabitStore
        return (
            <Modal open>
                <div className={classes.content}>
                    <EditHabit
                        getInitialValues={getInitialValues}
                        onSubmit={onSubmit}
                        formProps={formProps}
                    />
                </div>
            </Modal>
        )
    }
}

const AddNewHabitModal = flowRight(
    withStyles(styles),
    inject('newHabitModalStore', 'transport', 'uiStore'),
    observer
)(AddNewHabitModalPure)

export { AddNewHabitModal }
