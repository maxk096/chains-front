import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { AddNewHabitBtn } from './add-new-habit/add-new-habit-btn'
import { observer, Provider } from 'mobx-react'
import { HabitsStore } from '../../stores/habits/habits-store'
import { AddNewHabitModal } from './add-new-habit/add-new-habit-modal'

const styles = (theme) => {
    return createStyles({
        root: {
            position: 'relative'
        }
    })
}

class HabitsPagePure extends React.Component {
    constructor(props) {
        super(props)
        this.habitsStore = new HabitsStore()
    }

    render() {
        const { classes } = this.props
        const { addNewHabitStore } = this.habitsStore

        return (
            <Provider addNewHabitStore={addNewHabitStore}>
                <Page className={classes.root}>
                    <Header />
                    <AddNewHabitBtn />
                    <AddNewHabitModal />
                </Page>
            </Provider>
        )
    }
}

const HabitsPage = flowRight(withStyles(styles), observer)(HabitsPagePure)

export { HabitsPage }
