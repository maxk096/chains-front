import { Redirect, Route } from 'react-router-dom'
import { routes } from '../../../stores/routing/routes'

export const PrivateRoute = (props) => {
    const { isAllowed, redirectTo, ...rest } = props
    if (isAllowed) {
        return <Route {...rest} />
    }
    return <Redirect to={redirectTo} />
}
PrivateRoute.defaultProps = {
    redirectTo: routes.homepage.url
}
