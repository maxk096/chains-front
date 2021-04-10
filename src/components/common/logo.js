import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { getCommonStyles } from '../common-styles'

const styles = (theme) => {
    return createStyles({
        ...getCommonStyles(theme),
        logoImg: {
            backgroundImage: `url("${theme.logoOrange}")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: 35,
            height: 35
        },
        logoImgReversed: {
            backgroundImage: `url("${theme.logoLight}")`,
        },
        logoTitle: {
            marginLeft: 15,
            fontSize: '1.2em',
            color: theme.logoTitle
        },
        logoTitleReversed: {
            color: theme.logoTitleReversed
        },
        root: {
            padding: '5px 10px'
        }
    })
}

const LogoPure = (props) => {
    const { classes, className, reversed } = props
    return (
        <div
            className={classNames({
                [classes.logo]: true,
                [classes.dflex]: true,
                [classes.alignCenter]: true,
                [className]: className
            })}
        >
            <div
                className={classNames({
                    [classes.logoImg]: true,
                    [classes.logoImgReversed]: reversed
                })}
            ></div>
            <span
                className={classNames({
                    [classes.logoTitle]: true,
                    [classes.logoTitleReversed]: reversed
                })}
            >
                Chains
            </span>
        </div>
    )
}

LogoPure.defaultProps = {
    reversed: false
}

const Logo = flowRight(withStyles(styles))(LogoPure)

export { Logo }
