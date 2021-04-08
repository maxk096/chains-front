import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.link.text,
            background: theme.link.primaryBg,
            textDecoration: 'none',
            transitionProperty: 'color, background',
            transitionDuration: '200ms',
            borderRadius: '20px'
        },
        withHover: {
            '&:hover': {
                color: theme.link.textActive,
                background: theme.link.activeBg
            }
        }
    })
}

const CommonLinkPure = (props) => {
    const { classes, className, withHover, ...rest } = props
    return (
        <Link
            className={classNames({
                [classes.root]: true,
                [className]: className,
                [classes.withHover]: withHover
            })}
            {...rest}
        />
    )
}
CommonLinkPure.defaultProps = {
    withHover: true
}

const CommonLink = flowRight(withStyles(styles))(CommonLinkPure)

export { CommonLink }
