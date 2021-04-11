import React from 'react'
import { Card, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { Logo } from '../common/logo'
import { Formik } from 'formik'
import { InputField } from '../common/form/input-field'
import { inject, observer, Provider } from 'mobx-react'
import { CommonForm } from '../common/form/form'
import { CommonErrorMessage } from '../common/error-message'
import { LoadingButton } from '../common/loading-button'
import { CommonLink } from '../common/link'
import { routes } from '../../stores/routing/routes'
import { authStyles } from './styles'
import { AuthStore } from '../../stores/auth/auth-store'
import { SignInMethods } from './sing-in-methods'
import { withRouter } from 'react-router-dom'

class SignInPure extends React.Component {
    constructor(p) {
        super(p)
        const { authFacade, history } = this.props
        this.authStore = new AuthStore({ authFacade, history })
    }

    Form = observer(() => {
        const { classes } = this.props
        const { getErrorState, isLoading } = this.authStore
        return (
            <CommonForm className={classes.form}>
                <InputField name='email' placeholder='Email' />
                <InputField name='pass' type='password' placeholder='Password' />
                <CommonErrorMessage>{getErrorState()}</CommonErrorMessage>
                <LoadingButton pending={isLoading} variant='contained' color='primary' type='submit'>
                    Sign In
                </LoadingButton>
                <Typography className={classes.infoWrap} variant='body2'>
                    <span className={classes.infoText}>Don't have an account?</span>
                    <CommonLink to={routes.signup.url}>Sign up</CommonLink>
                </Typography>
                <SignInMethods />
            </CommonForm>
        )
    })

    render() {
        const { classes } = this.props
        const { onSignInSubmit, signInValidationSchema, getSignInInitialValues } = this.authStore
        return (
            <Provider authStore={this.authStore}>
                <Page>
                    <Header />
                    <div className={classes.content}>
                        <Card className={classes.card}>
                            <Logo className={classes.logo} />
                            <Formik
                                initialValues={getSignInInitialValues()}
                                validationSchema={signInValidationSchema}
                                onSubmit={onSignInSubmit}
                                component={this.Form}
                            />
                        </Card>
                    </div>
                </Page>
            </Provider>
        )
    }
}
const SignIn = flowRight(withStyles(authStyles), withRouter, inject('authFacade'), observer)(SignInPure)

export { SignIn }
