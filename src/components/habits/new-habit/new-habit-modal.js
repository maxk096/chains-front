import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { modalState } from '../../../stores/habits/new-habit/new-habit-modal'
import { AddNewHabitModal } from './add-new-habit-modal'

const styles = (theme) => {
    return createStyles({})
}

class NewHabitModalPure extends React.Component {
    render() {
        const { newHabitModalStore } = this.props
        const { isOpen, state } = newHabitModalStore

        if (!isOpen) {
            return null
        }

        switch (state) {
            case modalState.NEW_HABIT:
                return <AddNewHabitModal />
            default:
                return null
        }
    }
}

const NewHabitModal = flowRight(withStyles(styles), inject('newHabitModalStore'), observer)(NewHabitModalPure)

export { NewHabitModal }
