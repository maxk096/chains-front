import { Button, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.textPrimary
        }
    })
}

const CommonButtonPure = (props) => {
    return <Button {...props} />
}

const CommonButton = flowRight(withStyles(styles))(CommonButtonPure)

export { CommonButton }
