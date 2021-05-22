import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import cl from 'classnames'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: theme.palette.primary.main,
            overflowY: 'auto'
        }
    })
}

const PagePure = (props) => {
    const { children, classes, className } = props
    return <div className={cl(classes.root, className)}>{children}</div>
}

const Page = flowRight(withStyles(styles))(PagePure)

export { Page }
