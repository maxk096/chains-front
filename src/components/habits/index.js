import { createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { NewHabitBtn, NEW_HABIT_BTN_RESERVED_HEIGHT } from './new-habit/new-habit-btn'
import { inject, observer, Provider } from 'mobx-react'
import { HabitsStore } from '../../stores/habits/habits-store'
import { NewHabitModal } from './new-habit/new-habit-modal'
import { NewHabitModalStore } from '../../stores/habits/new-habit/new-habit-modal'
import { HabitsList } from './list/habits-list'
import { Loader } from '../common/loader'

const styles = (theme) => {
    return createStyles({
        root: {
            position: 'relative'
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            paddingBottom: NEW_HABIT_BTN_RESERVED_HEIGHT
        },
        innerContent: {
            maxWidth: 900,
            padding: '0 10px',
            flex: 1
        },
        myHabits: {
            margin: '20px 0'
        },
        habitsList: {
            width: '100%',
            height: '100%'
        },
        loaderWrap: {
            height: '100%'
        }
    })
}

class HabitsPagePure extends React.Component {
    constructor(props) {
        super(props)
        const { transport } = this.props
        const { habitsTransport } = transport
        this.habitsStore = new HabitsStore({ habitsTransport })
        this.newHabitModalStore = new NewHabitModalStore()
    }

    componentDidMount() {
        this.habitsStore.init()
    }

    componentWillUnmount() {
        this.habitsStore.cleanUp()
    }

    render() {
        const { classes } = this.props
        const { habits, isInitialized } = this.habitsStore

        return (
            <Provider newHabitModalStore={this.newHabitModalStore}>
                <Page className={classes.root}>
                    <Header />
                    <div className={classes.content}>
                        <div className={classes.innerContent}>
                            <div className={classes.habitsList}>
                                <Loader
                                    classes={{ loaderWrap: classes.loaderWrap }}
                                    isLoading={!isInitialized}
                                    render={() => (
                                        <>
                                            <Typography className={classes.myHabits} variant='h6'>
                                                My habits
                                            </Typography>
                                            <HabitsList habits={habits} />
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <NewHabitBtn />
                    <NewHabitModal />
                </Page>
            </Provider>
        )
    }
}

const HabitsPage = flowRight(withStyles(styles), inject('transport'), observer)(HabitsPagePure)

export { HabitsPage }
