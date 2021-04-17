import { createStyles, TextField, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {}
    })
}

const CommonTextFieldPure = (props) => {
    return <TextField {...props} />
}

const CommonTextField = flowRight(withStyles(styles))(CommonTextFieldPure)

export { CommonTextField }
