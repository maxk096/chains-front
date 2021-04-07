import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.linkPrimary,
            textDecoration: 'none',
            transition: 'color 200ms',
            '&:hover': {
                color: theme.linkPrimaryActive
            }
        }
    })
}

const CommonLinkPure = (props) => {
    const { classes, className, ...rest } = props
    return <Link className={classNames(classes.root, className)} {...rest} />
}

const CommonLink = flowRight(withStyles(styles))(CommonLinkPure)

export { CommonLink }
