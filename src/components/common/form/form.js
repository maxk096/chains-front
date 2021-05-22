import { createStyles, withStyles } from '@material-ui/core'
import { Form } from 'formik'
import React from 'react'
import { flowRight } from 'lodash'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

const CommonFormPure = (props) => {
    const { classes, className, ...rest } = props
    return <Form className={classNames(classes.root, className)} {...rest} />
}

const CommonForm = flowRight(withStyles(styles))(CommonFormPure)

export { CommonForm }
