import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../stores/routing/routes'
import { PageNotFound } from '../common/page-not-found'
import { Home } from '../home'
import { SignUp } from '../auth/sing-up'
import { SignIn } from '../auth/sign-in'
import { HabitsPage } from '../habits'
import { WithAuthRoute } from '../common/routes/with-auth-route'
import { WithoutAuthRoute } from '../common/routes/without-auth-route'

class GlobalRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={routes.homepage.url} exact component={Home} />
                <WithoutAuthRoute path={routes.signup.url} exact component={SignUp} />
                <WithoutAuthRoute path={routes.signin.url} exact component={SignIn} />
                <WithAuthRoute path={routes.habits.url} exact component={HabitsPage} />
                <Route path={routes.notFound.url} component={PageNotFound} />
            </Switch>
        )
    }
}

export { GlobalRouter }
