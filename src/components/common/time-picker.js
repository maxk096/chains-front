import React from 'react'
import TimeInput from 'material-ui-time-picker'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = () => {
    return createStyles({
        root: {
            width: 40
        }
    })
}

const CommonTimePickerPure = (props) => {
    const { classes, className, ...rest } = props
    return <TimeInput className={classNames(classes.root, className)} {...rest} />
}

export const CommonTimePicker = flowRight(withStyles(styles))(CommonTimePickerPure)
