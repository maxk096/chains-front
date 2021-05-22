import { createStyles, Modal, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { NewHabitFromPhotoStore } from '../../../../stores/habits/new-habit/new-habit-from-photo'
import { modalState } from '../../../../stores/habits/new-habit/new-habit-from-photo'
import { modalStyles } from '../../styles'
import { UploadPhoto } from './upload-photo'
import { DecodedHabits } from './decoded-habits'
import { EditHabit } from '../../edit-habit/edit-habit'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme)
    })
}

class AddNewHabitFromPhotoModalPure extends React.Component {
    constructor(p) {
        super(p)
        const { transport, newHabitModalStore, uiStore } = this.props
        const { habitsTransport } = transport
        this.newHabitFromPhotoStore = new NewHabitFromPhotoStore({
            habitsTransport,
            newHabitModalStore,
            uiStore
        })
    }

    render() {
        const { classes } = this.props
        const { state, getHabitInitialValues, onHabitSubmit, habitFormProps } = this.newHabitFromPhotoStore

        return (
            <Provider newHabitFromPhotoStore={this.newHabitFromPhotoStore}>
                <Modal open>
                    <div className={classes.rootContent}>
                        {state === modalState.UPLOAD_PHOTO && <UploadPhoto />}
                        {state === modalState.DECODED_HABITS && <DecodedHabits />}
                        {state === modalState.ADD_NEW_HABIT && (
                            <EditHabit
                                getInitialValues={getHabitInitialValues}
                                onSubmit={onHabitSubmit}
                                formProps={habitFormProps}
                            />
                        )}
                    </div>
                </Modal>
            </Provider>
        )
    }
}

const AddNewHabitFromPhotoModal = flowRight(
    withStyles(styles),
    inject('newHabitModalStore', 'transport', 'uiStore'),
    observer
)(AddNewHabitFromPhotoModalPure)

export { AddNewHabitFromPhotoModal }
