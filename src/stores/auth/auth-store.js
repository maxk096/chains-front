import { computed, flow, makeObservable } from 'mobx'
import * as yup from 'yup'
import { LoadingStore } from '../loading/loading-store'

export class AuthStore extends LoadingStore {
    constructor(props) {
        super()
        this.authFacade = props.authFacade
        makeObservable(this, {
            handleOnSingUpSubmit: flow,
            signUpValidationSchema: computed,
            handleOnSigInSubmit: flow,
            signInValidationSchema: computed,
            handleOnGoogleSignIn: flow
        })
    }

    getSignUpInitialValues = () => {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    }

    get signUpValidationSchema() {
        const passMatchTest = function (value) {
            return this.parent.pass1 === value
        }
        return yup.object().shape({
            email: yup.string().namedRequired('Email'),
            pass1: yup.string().namedRequired('Password'),
            pass2: yup
                .string()
                .namedRequired('Confirm password')
                .test('pass-match', 'The passwords you entered do not match.', passMatchTest)
        })
    }

    onSingUpSubmit = async (...props) => {
        await this.handleOnSingUpSubmit(...props)
    };

    *handleOnSingUpSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            this.startLoading()
            const { email, pass1 } = values
            yield this.authFacade.createUserWithEmailAndPassword(email, pass1)
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            this.stopLoading()
            setSubmitting(false)
        }
    }

    getSignInInitialValues = () => {
        return {
            email: '',
            pass: ''
        }
    }

    get signInValidationSchema() {
        return yup.object().shape({
            email: yup.string().namedRequired('Email'),
            pass: yup.string().namedRequired('Password')
        })
    }

    onSignInSubmit = async (...props) => {
        await this.handleOnSigInSubmit(...props)
    };

    *handleOnSigInSubmit(values, { setSubmitting }) {
        try {
            setSubmitting(true)
            this.clearErrorState()
            this.startLoading()
            const { email, pass } = values
            yield this.authFacade.signInWithEmailAndPassword(email, pass)
        } catch (ex) {
            this.setErrorState(ex.message)
        } finally {
            this.stopLoading()
            setSubmitting(false)
        }
    }

    onGoogleSignIn = async () => {
        await this.handleOnGoogleSignIn()
    };

    *handleOnGoogleSignIn() {
        try {
            this.clearErrorState()
            yield this.authFacade.googleSignInWithPopup()
        } catch (ex) {}
    }
}
