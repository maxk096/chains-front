import { connect } from 'formik'
import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.palette.error.light,
            margin: '5px 0'
        }
    })
}

const CommonErrorMessagePure = (props) => {
    const { className, children, classes, ...rest } = props
    return (
        <div className={classNames(classes.root, className)} {...rest}>
            {children}
        </div>
    )
}

const CommonErrorMessage = flowRight(withStyles(styles), connect)(CommonErrorMessagePure)

export { CommonErrorMessage }
