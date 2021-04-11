import React from 'react'
import { observer, Provider } from 'mobx-react'
import { GlobalRouter } from './global-router'
import { BrowserRouter } from 'react-router-dom'
import { CommonCssBaseline } from '../common/css-baseline'
import { ThemeStore } from '../../stores/theme/theme-store'
import { ThemeProvider } from '@material-ui/core'
import { UserStore } from '../../stores/user/uset-store'
import { AuthFacade } from '../../firebase/auth-facade'
import { flowRight } from 'lodash'

class AppPure extends React.Component {
    constructor(p) {
        super(p)
        const themeStore = new ThemeStore()
        const authFacade = new AuthFacade()
        const userStore = new UserStore({ authFacade })
        this.globalStores = {
            themeStore,
            userStore,
            authFacade
        }
    }

    componentWillUnmount() {
        this.globalStores.userStore.cleanUp()
    }

    render() {
        if (!this.globalStores.userStore.isInitialized) {
            return null
        }

        return (
            <Provider {...this.globalStores}>
                <BrowserRouter>
                    <ThemeProvider theme={this.globalStores.themeStore.theme}>
                        <CommonCssBaseline />
                        <GlobalRouter />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        )
    }
}

export const App = flowRight(observer)(AppPure)
