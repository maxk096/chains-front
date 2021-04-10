import React from 'react'
import ReactDOM from 'react-dom'
import { initFirebase } from './firebase/index'
import { initValidationMethods } from './utils/validation'
import { App } from './components/app/app'

const startApp = () => {
    initFirebase()
    initValidationMethods()

    ReactDOM.render(<App />, document.getElementById('root'))
}

startApp()
