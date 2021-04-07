import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../stores/routing/routes'
import { PageNotFound } from '../common/page-not-found'
import { Home } from '../home'

class GlobalRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={routes.homepage.url} exact component={Home} />
                <Route path={routes.notFound.url} component={PageNotFound} />
            </Switch>
        )
    }
}

export { GlobalRouter }
