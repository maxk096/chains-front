import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { Page } from '../common/page'

const styles = (theme) => {
    return createStyles({})
}

const HabitsPagePure = (props) => {
    const { classes } = props

    return <Page className={classes.root}>habits..</Page>
}

const HabitsPage = flowRight(withStyles(styles))(HabitsPagePure)

export { HabitsPage }
