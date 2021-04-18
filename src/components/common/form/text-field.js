import { Field } from 'formik'
import { CommonTextField } from '../text-field'
import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import { FormErrorMessage } from './form-error-message'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        wrap: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

const FormTextFieldPure = (props) => {
    const { name, classes, withErrorMessage, wrapClass, ...inputFieldRest } = props
    return (
        <Field name={name}>
            {({ field, form }) => {
                // There's a known case when React may call onBlur listener with
                // an `event` set to `undefined`, Formik is not ready for that.
                const onBlur = (ev) => {
                    if (ev) {
                        field.onBlur?.(ev)
                    }
                }
                return (
                    <div className={classNames(classes.wrap, wrapClass)}>
                        <CommonTextField
                            disabled={form.isSubmitting}
                            {...field}
                            {...inputFieldRest}
                            onBlur={onBlur}
                        />
                        {withErrorMessage && <FormErrorMessage name={name} />}
                    </div>
                )
            }}
        </Field>
    )
}
FormTextFieldPure.defaultProps = {
    withErrorMessage: true
}

const FormTextField = flowRight(withStyles(styles))(FormTextFieldPure)

export { FormTextField }
