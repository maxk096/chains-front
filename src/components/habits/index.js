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
import { HabitExecutionStore } from '../../stores/habits/habit-execution/habit-execution-store'
import { habitExecutionCtx } from './list/habit-execution-btn'
import { CenteredContent } from '../common/centered-content'
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded'

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
        title: {
            margin: '20px 0'
        },
        habitsList: {
            width: '100%',
            height: '100%'
        },
        loaderWrap: {
            height: '100%'
        },
        noHabitsWrap: {
            display: 'flex',
            alignItems: 'center'
        },
        noHabitsIcon: {
            marginLeft: 10,
            width: 50,
            height: 50
        }
    })
}

const HabitExecutionCtxProvider = habitExecutionCtx.Provider

class HabitsPagePure extends React.Component {
    constructor(props) {
        super(props)
        const { transport, uiStore } = this.props
        const { habitsTransport } = transport
        this.habitsStore = new HabitsStore({ habitsTransport })
        this.habitExecutionStore = new HabitExecutionStore({ habitsTransport, uiStore })
        this.newHabitModalStore = new NewHabitModalStore()
        const {
            onExecutionClick,
            onExecutionLongPress,
            getTodaysExecutionByHabitId,
            getTodaysHabitExecutionType
        } = this.habitExecutionStore
        this.habitActionsCtxValue = {
            onExecutionClick,
            onExecutionLongPress,
            getTodaysExecutionByHabitId,
            getTodaysHabitExecutionType
        }
    }

    componentDidMount() {
        this.habitsStore.init()
        this.habitExecutionStore.init()
    }

    componentWillUnmount() {
        this.habitsStore.cleanUp()
        this.habitExecutionStore.cleanUp()
    }

    renderContent = () => {
        const { classes } = this.props
        const { habits } = this.habitsStore

        if (!habits.length) {
            return (
                <CenteredContent fullHeight>
                    <div className={classes.noHabitsWrap}>
                        <Typography className={classes.title} variant='subtitle2'>
                            It's time to build some habits together
                        </Typography>
                        <SentimentVerySatisfiedRoundedIcon className={classes.noHabitsIcon} />
                    </div>
                </CenteredContent>
            )
        }

        return (
            <>
                <Typography className={classes.title} variant='h6'>
                    My habits
                </Typography>
                <HabitsList habits={habits} />
            </>
        )
    }

    render() {
        const { classes } = this.props
        const { isHabitsInitialized } = this.habitsStore
        const { isExecutionsInitialized } = this.habitExecutionStore
        const isInitialized = isHabitsInitialized && isExecutionsInitialized

        return (
            <Provider newHabitModalStore={this.newHabitModalStore}>
                <HabitExecutionCtxProvider value={this.habitActionsCtxValue}>
                    <Page className={classes.root}>
                        <Header />
                        <div className={classes.content}>
                            <div className={classes.innerContent}>
                                <div className={classes.habitsList}>
                                    <Loader
                                        classes={{ loaderWrap: classes.loaderWrap }}
                                        isLoading={!isInitialized}
                                        render={this.renderContent}
                                    />
                                </div>
                            </div>
                        </div>
                        <NewHabitBtn />
                        <NewHabitModal />
                    </Page>
                </HabitExecutionCtxProvider>
            </Provider>
        )
    }
}

const HabitsPage = flowRight(withStyles(styles), inject('transport', 'uiStore'), observer)(HabitsPagePure)

export { HabitsPage }
