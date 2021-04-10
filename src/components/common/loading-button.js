import { CircularProgress, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { CommonButton } from './button'

const styles = (theme) => {
    return createStyles({
        contained: {
            '&$disabled': {
                color: theme.loadingButtonPendingColor
            }
        },
        disabled: {}
    })
}

const LoadingButtonPure = (props) => {
    const { children, pending, ...rest } = props
    return (
        <CommonButton {...rest} disabled={pending}>
            {pending ? <CircularProgress size={24} /> : children}
        </CommonButton>
    )
}

const LoadingButton = flowRight(withStyles(styles))(LoadingButtonPure)

export { LoadingButton }
