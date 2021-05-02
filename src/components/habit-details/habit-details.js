import { createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Loader } from '../common/loader'
import { HabitItem } from '../habits/list/habit-item'
import { HabitDetailsStore } from '../../stores/habit-details/habit-details'
import { HabitExecutionStore } from '../../stores/habits/habit-execution/habit-execution-store'
import { CenteredContent } from '../common/centered-content'
import { CommonLink } from '../common/link'
import { routes } from '../../stores/routing/routes'
import { HabitEditStore } from '../../stores/habit-details/habit-edit-store'
import { DeleteHabitStore } from '../../stores/habit-details/delete-habit-store'
import { withExecutionsWorker } from './executions-worker-provider'
import { HabitChartsStore } from '../../stores/habit-details/habit-charts-store'

const styles = (theme) => {
    return createStyles({
        content: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1
        },
        innerContent: {
            maxWidth: 900,
            padding: '20px 10px',
            flex: 1
        },
        loaderWrap: {
            height: '100%'
        }
    })
}

class HabitDetailsPure extends React.Component {
    constructor(props) {
        super(props)
        const { transport, uiStore, history, habitId, executionsWorker } = this.props
        const { habitsTransport } = transport
        this.habitDetailsStore = new HabitDetailsStore({ habitId, habitsTransport })
        this.habitExecutionStore = new HabitExecutionStore({ habitId, habitsTransport, uiStore })
        this.habitEditStore = new HabitEditStore({ habitsTransport, uiStore })
        this.deleteHabitStore = new DeleteHabitStore({ habitsTransport, uiStore, history })
        this.habitChartsStore = new HabitChartsStore({
            habitId,
            habitsTransport,
            executionsWorker,
            habitDetailsStore: this.habitDetailsStore
        })
    }

    async componentDidMount() {
        this.habitDetailsStore.init()
        this.habitExecutionStore.init()
        this.habitChartsStore.init()
    }

    componentWillUnmount() {
        this.habitDetailsStore.cleanUp()
        this.habitExecutionStore.cleanUp()
        this.habitChartsStore.cleanUp()
    }

    renderHabitContent = () => {
        const { habit } = this.habitDetailsStore

        return (
            <div>
                <HabitItem habit={habit} detailedView showEdit showDelete />
            </div>
        )
    }

    renderNoHabitContent = () => {
        return (
            <CenteredContent fullHeight>
                <Typography variant='subtitle2'>This habit is deleted or doesn't exist.</Typography>
                <CommonLink to={routes.habits.url}>Back to my habits</CommonLink>
            </CenteredContent>
        )
    }

    renderContent = () => {
        const { habit } = this.habitDetailsStore

        if (habit) {
            return this.renderHabitContent()
        }

        return this.renderNoHabitContent()
    }

    render() {
        const { classes } = this.props
        const { isHabitInitialized } = this.habitDetailsStore
        const { isExecutionsInitialized } = this.habitExecutionStore
        const isInitialized = isHabitInitialized && isExecutionsInitialized

        return (
            <Provider
                newHabitModalStore={this.newHabitModalStore}
                habitExecutionStore={this.habitExecutionStore}
                habitEditStore={this.habitEditStore}
                deleteHabitStore={this.deleteHabitStore}
            >
                <div className={classes.content}>
                    <div className={classes.innerContent}>
                        <Loader
                            classes={{ loaderWrap: classes.loaderWrap }}
                            isLoading={!isInitialized}
                            render={this.renderContent}
                        />
                    </div>
                </div>
            </Provider>
        )
    }
}

const HabitDetails = flowRight(
    withStyles(styles),
    withRouter,
    withExecutionsWorker(),
    inject('transport', 'uiStore'),
    observer
)(HabitDetailsPure)

export { HabitDetails }
