import React from 'react'
import { observer, inject } from 'mobx-react'
import { flowRight } from 'lodash'
import { withSnackbar } from 'notistack'

class RegisterSnackbarPure extends React.Component {
    constructor(p) {
        super(p)
        const { uiStore, enqueueSnackbar } = this.props
        uiStore.registerEnqueueSnackbar(enqueueSnackbar)
    }

    render() {
        return this.props.children
    }
}

export const RegisterSnackbar = flowRight(
    inject('uiStore'),
    withSnackbar,
    observer
)(RegisterSnackbarPure)
