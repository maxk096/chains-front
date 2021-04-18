import React from 'react'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import TimePicker from 'react-time-picker'

const styles = () => {
    return createStyles({})
}

const CommonTimePickerPure = (props) => {
    const { className, ...rest } = props
    return <TimePicker className={className} {...rest} />
}

export const CommonTimePicker = flowRight(withStyles(styles))(CommonTimePickerPure)
