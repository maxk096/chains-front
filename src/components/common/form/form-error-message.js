import { connect } from 'formik'
import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import { CommonErrorMessage } from '../error-message'

const styles = (theme) => {
    return createStyles({
        root: {
            minHeight: 25,
            margin: 0
        }
    })
}

const FormErrorMessagePure = (props) => {
    const { name, classes, formik } = props
    const { touched, errors } = formik
    const msg = touched[name] && errors[name]

    return <CommonErrorMessage className={classes.root}>{msg}</CommonErrorMessage>
}

const FormErrorMessage = flowRight(withStyles(styles), connect)(FormErrorMessagePure)

export { FormErrorMessage }
