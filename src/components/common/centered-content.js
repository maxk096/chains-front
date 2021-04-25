import { createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            '&:before, &:after': {
                content: '""',
                display: 'block',
                flexGrow: 1,
                minHeight: 24
            },
            [theme.breakpoints.down('xs')]: {
                '&:before, &:after': {
                    display: 'none'
                }
            }
        },
        fullHeight: {
            height: '100%'
        }
    })
}

const CenteredContentPure = (props) => {
    const { classes, className, fullHeight, children, ...rest } = props
    return (
        <div
            className={classNames({
                [className]: className,
                [classes.root]: true,
                [classes.fullHeight]: fullHeight
            })}
            {...rest}
        >
            {children}
        </div>
    )
}

const CenteredContent = flowRight(withStyles(styles))(CenteredContentPure)

export { CenteredContent }
