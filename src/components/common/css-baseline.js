import React from 'react'
import { createStyles, CssBaseline, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'

const styles = () => {
    return createStyles({
        '@global': {
            '#root': {
                height: '100vh'
            }
        }
    })
}

const CommonCssBaselinePure = () => {
    return <CssBaseline />
}

const CommonCssBaseline = flowRight(withStyles(styles))(CommonCssBaselinePure)

export { CommonCssBaseline }
