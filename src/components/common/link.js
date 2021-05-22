import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.link.text,
            textDecoration: 'none',
            transitionProperty: 'color, background',
            transitionDuration: '200ms',
            borderRadius: '20px',
            '&:hover': {
                color: theme.link.textActive
            }
        }
    })
}

const CommonLinkPure = (props) => {
    const { classes, className, ...rest } = props
    return (
        <Link
            className={classNames({
                [classes.root]: true,
                [className]: className
            })}
            {...rest}
        />
    )
}

const CommonLink = flowRight(withStyles(styles))(CommonLinkPure)

export { CommonLink }
