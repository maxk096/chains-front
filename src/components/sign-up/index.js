import React from 'react'
import { Card, createStyles, Typography, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import { Header } from '../common/header'
import { Page } from '../common/page'
import { Logo } from '../common/logo'
import { SignUpStore } from '../../stores/sign-up/sign-up-store'
import { Formik } from 'formik'
import { InputField } from '../common/form/input-field'
import { inject, observer } from 'mobx-react'
import { CommonForm } from '../common/form/form'
import { CommonErrorMessage } from '../common/error-message'
import { LoadingButton } from '../common/loading-button'
import { CommonLink } from '../common/link'
import { routes } from '../../stores/routing/routes'

const styles = (theme) => {
    return createStyles({
        content: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '&:before, &:after': {
                content: '""',
                display: 'block',
                flexGrow: 1,
                minHeight: 24
            },
            [theme.breakpoints.down('xs')]: {
                '&:before, &:after': {
                    display: 'none'
                }
            }
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        logo: {
            marginBottom: 30
        },
        form: {
            width: '100%'
        },
        submitBtn: {
            marginTop: 15
        },
        haveAnAccountWrap: {
            marginTop: 15,
            display: 'flex',
            justifyContent: 'center'
        },
        haveAnAccount: {
            marginRight: 8
        }
    })
}

class SignUpPure extends React.Component {
    constructor(p) {
        super(p)
        const { authFacade } = this.props
        this.signUpStore = new SignUpStore({ authFacade })
    }

    Form = observer(() => {
        const { classes } = this.props
        const { getErrorState, isLoading } = this.signUpStore
        return (
            <CommonForm className={classes.form}>
                <InputField name='email' placeholder='Email' />
                <InputField name='pass1' type='password' placeholder='Password' />
                <InputField name='pass2' type='password' placeholder='Confirm password' />
                <CommonErrorMessage>{getErrorState()}</CommonErrorMessage>
                <LoadingButton
                    pending={isLoading}
                    className={classes.submitBtn}
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Sign up
                </LoadingButton>
                <Typography className={classes.haveAnAccountWrap} variant='body2'>
                    <span className={classes.haveAnAccount}>Have an account?</span>
                    <CommonLink to={routes.login.url}>Login</CommonLink>
                </Typography>
            </CommonForm>
        )
    })

    render() {
        const { classes } = this.props
        const { onSubmit, getInitialValues, validationSchema } = this.signUpStore
        return (
            <Page>
                <Header />
                <div className={classes.content}>
                    <Card className={classes.card}>
                        <Logo className={classes.logo} />
                        <Formik
                            initialValues={getInitialValues()}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            component={this.Form}
                        />
                    </Card>
                </div>
            </Page>
        )
    }
}
const SignUp = flowRight(withStyles(styles), inject('authFacade'), observer)(SignUpPure)

export { SignUp }
