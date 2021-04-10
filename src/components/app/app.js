import React from 'react'
import { Provider } from 'mobx-react'
import { GlobalRouter } from './global-router'
import { BrowserRouter } from 'react-router-dom'
import { CommonCssBaseline } from '../common/css-baseline'
import { ThemeStore } from '../../stores/theme/theme-store'
import { ThemeProvider } from '@material-ui/core'
import { UserStore } from '../../stores/user/uset-store'
import { AuthFacade } from '../../firebase/auth-facade'

class App extends React.Component {
    constructor(p) {
        super(p)
        const themeStore = new ThemeStore()
        const userStore = new UserStore()
        const authFacade = new AuthFacade()
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

export { App }
