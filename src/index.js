import React from 'react'
import ReactDOM from 'react-dom'
import './utils/validation'
import './utils/dayjs'
import { initFirebase } from './firebase/index'
import { App } from './components/app/app'

const startApp = async () => {
    await initFirebase()

    ReactDOM.render(<App />, document.getElementById('root'))
}

startApp()
