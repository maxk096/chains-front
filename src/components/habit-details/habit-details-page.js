import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { HabitDetails } from './habit-details'
import { ExecutionsWorkerProvider } from './executions-worker-provider'

const styles = (theme) => {
    return createStyles({})
}

class HabitDetailsPagePure extends React.Component {
    render() {
        const { match } = this.props
        const { habitId } = match.params
        return (
            <ExecutionsWorkerProvider>
                <Page>
                    <Header />
                    <HabitDetails habitId={habitId} />
                </Page>
            </ExecutionsWorkerProvider>
        )
    }
}

const HabitDetailsPage = flowRight(withStyles(styles), withRouter, observer)(HabitDetailsPagePure)

export { HabitDetailsPage }
