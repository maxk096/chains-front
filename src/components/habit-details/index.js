import { createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
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

class HabitDetailsPagePure extends React.Component {
    constructor(props) {
        super(props)
        const { match, transport, uiStore, history } = this.props
        const { habitsTransport } = transport
        const habitId = match.params.habitId
        this.habitExecutionStore = new HabitExecutionStore({ habitIds: [habitId], habitsTransport, uiStore })
        this.habitDetailsStore = new HabitDetailsStore({ habitId, habitsTransport })
        this.habitEditStore = new HabitEditStore({ habitsTransport, uiStore })
        this.deleteHabitStore = new DeleteHabitStore({ habitsTransport, uiStore, history })
    }

    componentDidMount() {
        this.habitDetailsStore.init()
        this.habitExecutionStore.init()
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
                <Page>
                    <Header />
                    <div className={classes.content}>
                        <div className={classes.innerContent}>
                            <Loader
                                classes={{ loaderWrap: classes.loaderWrap }}
                                isLoading={!isInitialized}
                                render={this.renderContent}
                            />
                        </div>
                    </div>
                </Page>
            </Provider>
        )
    }
}

const HabitDetailsPage = flowRight(
    withStyles(styles),
    withRouter,
    inject('transport', 'uiStore'),
    observer
)(HabitDetailsPagePure)

export { HabitDetailsPage }
