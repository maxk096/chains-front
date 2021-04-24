import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { NewHabitBtn } from './new-habit/new-habit-btn'
import { observer, Provider } from 'mobx-react'
import { HabitsStore } from '../../stores/habits/habits-store'
import { NewHabitModal } from './new-habit/new-habit-modal'
import { NewHabitModalStore } from '../../stores/habits/new-habit/new-habit-modal'

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
        this.newHabitModalStore = new NewHabitModalStore()
    }

    render() {
        const { classes } = this.props

        return (
            <Provider newHabitModalStore={this.newHabitModalStore}>
                <Page className={classes.root}>
                    <Header />
                    <NewHabitBtn />
                    <NewHabitModal />
                </Page>
            </Provider>
        )
    }
}

const HabitsPage = flowRight(withStyles(styles), observer)(HabitsPagePure)

export { HabitsPage }
