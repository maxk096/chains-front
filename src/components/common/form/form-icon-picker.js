import { connect } from 'formik'
import { flowRight } from 'lodash'
import React from 'react'
import { IconPicker } from '../icon-picker'

const FormIconPickerPure = (props) => {
    const { name, classes, formik, ...inputFieldRest } = props
    const { setFieldValue, isSubmitting } = formik
    const onChange = (_, icon) => {
        setFieldValue(name, icon)
    }
    return <IconPicker disabled={isSubmitting} {...inputFieldRest} onChange={onChange} />
}

const FormIconPicker = flowRight(connect)(FormIconPickerPure)

export { FormIconPicker }
