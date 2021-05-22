import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CenteredContent } from './centered-content'
import { flowRight } from 'lodash'
import { createStyles, withStyles } from '@material-ui/core'
import { observer } from 'mobx-react'

const styles = (theme) => {
    return createStyles({
        progress: {
            color: theme.loaderProgressColor
        },
        loaderWrap: {}
    })
}

const LoaderPure = (props) => {
    const { render, isLoading, classes } = props
    if (isLoading) {
        return (
            <CenteredContent className={classes.loaderWrap}>
                <CircularProgress className={classes.progress} />
            </CenteredContent>
        )
    }
    return render()
}

export const Loader = flowRight(withStyles(styles), observer)(LoaderPure)
