import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { CommonLink } from './link'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.header.link.text,
            '&:hover': {
                color: theme.header.link.textActive,
                background: theme.header.link.activeBg
            }
        }
    })
}

const HeaderLinkPure = (props) => {
    const { classes, className, ...rest } = props
    return (
        <CommonLink
            className={classNames({
                [classes.root]: true,
                [className]: className
            })}
            {...rest}
        />
    )
}

const HeaderLink = flowRight(withStyles(styles))(HeaderLinkPure)

export { HeaderLink }
