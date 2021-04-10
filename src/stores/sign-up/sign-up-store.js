import { computed, flow, makeObservable } from 'mobx'
import * as yup from 'yup'
import { LoadingStore } from '../loading/loading-store'

export class SignUpStore extends LoadingStore {
    constructor(props) {
        super()
        this.authFacade = props.authFacade
        makeObservable(this, {
            handleOnSubmit: flow,
            validationSchema: computed
        })
    }

    getInitialValues = () => {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    }

    get validationSchema() {
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

    onSubmit = async (...props) => {
        await this.handleOnSubmit(...props)
    };

    *handleOnSubmit(values, { setSubmitting }) {
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
}
