import { createStyles, withStyles } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.primary.light
        },
        googleButton: {
            width: '100% !important',
            outline: 'none',
            background: 'none !important',
            color: `${theme.palette.primary.light} !important`
        }
    })
}

const SignInMethodsPure = (props) => {
    const { classes, authStore } = props
    const { onGoogleSignIn } = authStore
    return (
        <div className={classes.root}>
            <p>or you can sign in with</p>
            <GoogleButton className={classes.googleButton} onClick={onGoogleSignIn} />
        </div>
    )
}

const SignInMethods = flowRight(withStyles(styles), inject('authStore'), observer)(SignInMethodsPure)

export { SignInMethods }
