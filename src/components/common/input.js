import { createStyles, Input, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {}
    })
}

const CommonInputPure = (props) => {
    return <Input {...props} />
}

const CommonInput = flowRight(withStyles(styles))(CommonInputPure)

export { CommonInput }
