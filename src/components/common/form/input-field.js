import { Field } from 'formik'
import { CommonInput } from '../input'
import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import { FormErrorMessage } from './form-error-message'

const styles = (theme) => {
    return createStyles({
        wrap: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

const InputFieldPure = (props) => {
    const { name, classes, ...inputFieldRest } = props
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
                    <div className={classes.wrap}>
                        <CommonInput
                            disabled={form.isSubmitting}
                            {...inputFieldRest}
                            {...field}
                            onBlur={onBlur}
                        />
                        <FormErrorMessage name={name} />
                    </div>
                )
            }}
        </Field>
    )
}

const InputField = flowRight(withStyles(styles))(InputFieldPure)

export { InputField }
