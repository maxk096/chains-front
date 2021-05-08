import React from 'react'
import ReactDOM from 'react-dom'
import './utils/validation'
import './utils/dayjs'
import { initFirebase } from './firebase/index'
import { App } from './components/app/app'
import { isEnvProduction } from './config'

const startApp = async () => {
    if (isEnvProduction) {
        installSW()
    }
    await initFirebase()
    ReactDOM.render(<App />, document.getElementById('root'))
}

const installSW = () => {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
        } catch (ex) {}
    })
}

startApp()
