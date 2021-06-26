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
import { CenteredContent } from '../common/centered-content'
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded'
import { withRouter } from 'react-router-dom'
import urlJoin from 'url-join'
import { routes } from '../../stores/routing/routes'

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
        },
        habitName: {
            cursor: 'pointer'
        }
    })
}

class HabitsPagePure extends React.Component {
    constructor(props) {
        super(props)
        const { transport, uiStore, dayObserverStore } = this.props
        const { habitsTransport } = transport
        this.habitsStore = new HabitsStore({ habitsTransport })
        this.habitExecutionStore = new HabitExecutionStore({ habitsTransport, uiStore, dayObserverStore })
        this.newHabitModalStore = new NewHabitModalStore()
    }

    componentDidMount() {
        this.habitsStore.init()
        this.habitExecutionStore.init()
    }

    componentWillUnmount() {
        this.habitsStore.cleanUp()
        this.habitExecutionStore.cleanUp()
    }

    getHabitItemProps = (habit) => {
        const { classes, history } = this.props
        const { id } = habit
        const habitUrl = urlJoin(routes.habits.url, id)
        return {
            onTitleClick: () => history.push(habitUrl),
            classes: {
                habitName: classes.habitName
            }
        }
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
                <HabitsList habits={habits} getHabitItemProps={this.getHabitItemProps} />
            </>
        )
    }

    render() {
        const { classes } = this.props
        const { isHabitsInitialized } = this.habitsStore
        const { isExecutionsInitialized } = this.habitExecutionStore
        const isInitialized = isHabitsInitialized && isExecutionsInitialized

        return (
            <Provider
                newHabitModalStore={this.newHabitModalStore}
                habitExecutionStore={this.habitExecutionStore}
            >
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
            </Provider>
        )
    }
}

const HabitsPage = flowRight(
    withStyles(styles),
    withRouter,
    inject('transport', 'uiStore', 'dayObserverStore'),
    observer
)(HabitsPagePure)

export { HabitsPage }
