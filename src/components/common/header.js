import { AppBar, createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { routes } from '../../stores/routing/routes'
import { getCommonStyles } from '../common-styles'
import { CommonLink } from './link'

const styles = (theme) => {
    return createStyles({
        ...getCommonStyles(theme),
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '0 50px',
            minHeight: 50,
            [theme.breakpoints.down('sm')]: {
                padding: '0 5px'
            }
        },
        transparent: {
            backgroundColor: 'transparent'
        },
        links: {
            display: 'flex',
            flexDirection: 'row'
        },
        link: {
            color: theme.headerLink,
            margin: '10px 20px',
            padding: '10px 20px',
            '&:hover': {
                color: theme.headerLinkActive
            },
            [theme.breakpoints.down('sm')]: {
                margin: '0 5px'
            }
        },
        logo: {
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
        logoLink: {
            padding: '5px 10px'
        }
    })
}

const HeaderPure = (props) => {
    const { isTransparent, classes } = props
    return (
        <AppBar
            className={classNames({
                [classes.root]: true,
                [classes.transparent]: isTransparent
            })}
            position="sticky"
        >
            <CommonLink
                to={routes.homepage.url}
                className={classNames(classes.logoLink, classes.dflex, classes.alignCenter)}
            >
                <div className={classes.logo}></div>
                <span className={classes.logoTitle}>Chains</span>
            </CommonLink>
            <div className={classes.links}>
                <CommonLink className={classes.link} to={routes.signup.url}>
                    Sign up
                </CommonLink>
                <CommonLink className={classes.link} to={routes.login.url}>
                    Login
                </CommonLink>
            </div>
        </AppBar>
    )
}

const Header = flowRight(withStyles(styles))(HeaderPure)

export { Header }
