import React from 'react'
import { observer, Provider } from 'mobx-react'
import { GlobalRouter } from './global-router'
import { BrowserRouter } from 'react-router-dom'
import { CommonCssBaseline } from '../common/css-baseline'
import { ThemeStore } from '../../stores/theme/theme-store'
import { ThemeProvider } from '@material-ui/core'
import { UserStore } from '../../stores/user/user-store'
import { AuthFacade } from '../../firebase/auth-facade'
import { flowRight } from 'lodash'
import { HabitsTransport } from '../../firebase/habits-transport'
import { UiStore } from '../../stores/ui/ui-store'
import { AppSnackbarProvider } from '../common/snackbar/snackbar-provider'
import { RegisterSnackbar } from '../common/snackbar/register-snackbar'
import { ConnectionStateStore } from '../../stores/connection-state/connection-state-store'
import { DayObserverStore } from '../../stores/day-observer/day-observer-store'

class AppPure extends React.Component {
    constructor(p) {
        super(p)
        const themeStore = new ThemeStore()
        const authFacade = new AuthFacade()
        const userStore = new UserStore({ authFacade })
        const uiStore = new UiStore()
        const connectionStateStore = new ConnectionStateStore()
        const dayObserverStore = new DayObserverStore()
        this.globalStores = {
            themeStore,
            userStore,
            authFacade,
            uiStore,
            connectionStateStore,
            dayObserverStore
        }

        const habitsTransport = new HabitsTransport({ userStore })
        this.globalTransport = {
            habitsTransport
        }
    }

    componentDidMount() {
        this.globalStores.userStore.init()
        this.globalStores.connectionStateStore.init()
        this.globalStores.dayObserverStore.init()
    }

    componentWillUnmount() {
        this.globalStores.userStore.cleanUp()
        this.globalStores.connectionStateStore.cleanUp()
        this.globalStores.dayObserverStore.cleanUp()
    }

    render() {
        const { userStore, themeStore, connectionStateStore, dayObserverStore } = this.globalStores
        const isInitialized =
            userStore.isInitialized && connectionStateStore.isInitialized && dayObserverStore.isInitialized

        if (!isInitialized) {
            return null
        }

        return (
            <Provider {...this.globalStores} transport={this.globalTransport}>
                <BrowserRouter>
                    <ThemeProvider theme={themeStore.theme}>
                        <AppSnackbarProvider>
                            <RegisterSnackbar>
                                <CommonCssBaseline />
                                <GlobalRouter />
                            </RegisterSnackbar>
                        </AppSnackbarProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        )
    }
}

export const App = flowRight(observer)(AppPure)
