import { createStyles, withStyles } from '@material-ui/core'
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
        const { match, transport, uiStore } = this.props
        const { habitsTransport } = transport
        const habitId = match.params.habitId
        this.habitExecutionStore = new HabitExecutionStore({ habitIds: [habitId], habitsTransport, uiStore })
        this.habitDetailsStore = new HabitDetailsStore({ habitId, habitsTransport })
    }

    componentDidMount() {
        this.habitDetailsStore.init()
        this.habitExecutionStore.init()
    }

    renderContent = () => {
        const { habit } = this.habitDetailsStore
        return (
            <div>
                <HabitItem habit={habit} detailedView />
            </div>
        )
    }

    render() {
        const { classes } = this.props
        const { isHabitInitialized } = this.habitDetailsStore
        const { isExecutionsInitialized } = this.habitExecutionStore
        const isInitialized = isHabitInitialized && isExecutionsInitialized

        return (
            <Provider newHabitModalStore={this.newHabitModalStore} habitExecutionStore={this.habitExecutionStore}>
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
