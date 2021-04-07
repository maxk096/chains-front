import React from 'react'
import { Provider } from 'mobx-react'
import { GlobalRouter } from './global-router'
import { BrowserRouter } from 'react-router-dom'
import { CommonCssBaseline } from '../common/css-baseline'
import { ThemeStore } from '../../stores/theme/theme-store'
import { ThemeProvider } from '@material-ui/core'

class App extends React.Component {
    constructor(p) {
        super(p)
        const themeStore = new ThemeStore()
        this.globalStores = {
            themeStore
        }
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
