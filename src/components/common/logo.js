import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { getCommonStyles } from '../common-styles'

const styles = (theme) => {
    return createStyles({
        ...getCommonStyles(theme),
        logoImg: {
            backgroundImage: `url("${theme.logoLight}")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: 35,
            height: 35
        },
        logoTitle: {
            marginLeft: 15,
            fontSize: '1.2em',
            color: theme.logoTitle
        },
        root: {
            padding: '5px 10px'
        }
    })
}

const LogoPure = (props) => {
    const { classes, className } = props
    return (
        <div className={classNames(classes.logo, classes.dflex, classes.alignCenter, className)}>
            <div className={classes.logoImg}></div>
            <span className={classes.logoTitle}>Chains</span>
        </div>
    )
}

const Logo = flowRight(withStyles(styles))(LogoPure)

export { Logo }
