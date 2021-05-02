import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { wrap } from 'comlink'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../../workers/habit-executions/habit-executions.worker'

const ExecutionsWorkerCtx = React.createContext(undefined)
const { Provider, Consumer } = ExecutionsWorkerCtx

export const ExecutionsWorkerProvider = ({ children }) => {
    const executionsWorker = useMemo(() => {
        const worker = new Worker()
        return wrap(worker)
    }, [])

    return <Provider value={executionsWorker}>{children}</Provider>
}

export const withExecutionsWorker = () => (Component) =>
    observer((props) => {
        return (
            <Consumer>
                {(executionsWorker) => <Component executionsWorker={executionsWorker} {...props} />}
            </Consumer>
        )
    })
