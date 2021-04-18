import { Field } from 'formik'
import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import { FormErrorMessage } from './form-error-message'
import classNames from 'classnames'
import { CommonTimePicker } from '../time-picker'

const styles = (theme) => {
    return createStyles({
        wrap: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

const FormTimePickerPure = (props) => {
    const { name, classes, withErrorMessage, wrapClass, ...inputFieldRest } = props
    return (
        <Field name={name}>
            {({ field, form }) => {
                const onChange = (time) => {
                    form.setFieldValue(name, time)
                }
                return (
                    <div className={classNames(classes.wrap, wrapClass)}>
                        <CommonTimePicker
                            disabled={form.isSubmitting}
                            {...inputFieldRest}
                            {...field}
                            onChange={onChange}
                            onBlur={undefined}
                        />
                        {withErrorMessage && <FormErrorMessage name={name} />}
                    </div>
                )
            }}
        </Field>
    )
}
FormTimePickerPure.defaultProps = {
    withErrorMessage: true
}

const FormTimePicker = flowRight(withStyles(styles))(FormTimePickerPure)

export { FormTimePicker }
