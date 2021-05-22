import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import { routes } from '../../../stores/routing/routes'
import { PrivateRoute } from './private-route'

const WithoutAuthRoutePure = (props) => {
    const { userStore, ...rest } = props
    const { user } = userStore
    return <PrivateRoute {...rest} isAllowed={!user} redirectTo={routes.habits.url} />
}

export const WithoutAuthRoute = flowRight(inject('userStore'), observer)(WithoutAuthRoutePure)
