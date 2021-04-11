import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import { PrivateRoute } from './private-route'

const WithAuthRoutePure = (props) => {
    const { userStore, ...rest } = props
    const { user } = userStore
    return <PrivateRoute {...rest} isAllowed={user} />
}

export const WithAuthRoute = flowRight(inject('userStore'), observer)(WithAuthRoutePure)
