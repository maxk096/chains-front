import React from 'react'
import { Card, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import { Header } from '../common/header/header'
import { Page } from '../common/page'
import { Logo } from '../common/logo'
import { AuthStore } from '../../stores/auth/auth-store'
import { Formik } from 'formik'
import { FormTextField } from '../common/form/text-field'
import { inject, observer, Provider } from 'mobx-react'
import { CommonForm } from '../common/form/form'
import { CommonErrorMessage } from '../common/error-message'
import { LoadingButton } from '../common/loading-button'
import { CommonLink } from '../common/link'
import { routes } from '../../stores/routing/routes'
import { authStyles } from './styles'
import { SignInMethods } from './sing-in-methods'
import { withRouter } from 'react-router-dom'
import { CenteredContent } from '../common/centered-content'

class SignUpPure extends React.Component {
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
                <FormTextField name='email' label='Email' />
                <FormTextField name='pass1' type='password' label='Password' />
                <FormTextField name='pass2' type='password' label='Confirm password' />
                <CommonErrorMessage>{getErrorState()}</CommonErrorMessage>
                <LoadingButton pending={isLoading} variant='contained' color='primary' type='submit'>
                    Sign up
                </LoadingButton>
                <Typography className={classes.infoWrap} variant='body2'>
                    <span className={classes.infoText}>Have an account?</span>
                    <CommonLink to={routes.signin.url}>Sign in</CommonLink>
                </Typography>
                <SignInMethods />
            </CommonForm>
        )
    })

    render() {
        const { classes } = this.props
        const { onSingUpSubmit, getSignUpInitialValues, signUpValidationSchema } = this.authStore
        return (
            <Provider authStore={this.authStore}>
                <Page>
                    <Header />
                    <CenteredContent className={classes.content}>
                        <Card className={classes.card}>
                            <Logo className={classes.logo} />
                            <Formik
                                initialValues={getSignUpInitialValues()}
                                validationSchema={signUpValidationSchema}
                                onSubmit={onSingUpSubmit}
                                component={this.Form}
                            />
                        </Card>
                    </CenteredContent>
                </Page>
            </Provider>
        )
    }
}
const SignUp = flowRight(withStyles(authStyles), withRouter, inject('authFacade'), observer)(SignUpPure)

export { SignUp }
