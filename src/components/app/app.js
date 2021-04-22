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

class AppPure extends React.Component {
    constructor(p) {
        super(p)
        const themeStore = new ThemeStore()
        const authFacade = new AuthFacade()
        const userStore = new UserStore({ authFacade })
        const uiStore = new UiStore()
        this.globalStores = {
            themeStore,
            userStore,
            authFacade,
            uiStore
        }

        const habitsTransport = new HabitsTransport({ userStore })
        this.globalTransport = {
            habitsTransport
        }
    }

    componentWillUnmount() {
        this.globalStores.userStore.cleanUp()
    }

    render() {
        const { userStore, themeStore } = this.globalStores

        if (!userStore.isInitialized) {
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
