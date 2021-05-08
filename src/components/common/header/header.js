import { AppBar, createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { routes } from '../../../stores/routing/routes'
import { HeaderLink } from '../header-link'
import { Logo } from '../logo'
import { OfflineTooltip } from './offline-tooltip'
import { UserMenu } from './user-menu'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '0 50px',
            height: 44,
            [theme.breakpoints.down('sm')]: {
                padding: '0 8px'
            }
        },
        transparent: {
            backgroundColor: 'transparent'
        },
        links: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        link: {
            color: theme.headerLink,
            margin: '0 20px',
            padding: '5px 10px',
            [theme.breakpoints.down('sm')]: {
                margin: '0 5px !important'
            }
        },
        logoLink: {
            '&:hover': {
                color: theme.header.link.text,
                background: 'none'
            }
        }
    })
}

const HeaderPure = (props) => {
    const { isTransparent, classes, userStore, ...rest } = props
    const { user } = userStore

    const renderLinks = () => {
        if (user) {
            return <UserMenu />
        }

        return (
            <>
                <OfflineTooltip />
                <HeaderLink className={classes.link} to={routes.signup.url}>
                    Sign up
                </HeaderLink>
                <HeaderLink className={classes.link} to={routes.signin.url}>
                    Sign in
                </HeaderLink>
            </>
        )
    }

    return (
        <AppBar
            className={classNames({
                [classes.root]: true,
                [classes.transparent]: isTransparent
            })}
            position='sticky'
            {...rest}
        >
            <HeaderLink className={classes.logoLink} to={routes.homepage.url}>
                <Logo reversed />
            </HeaderLink>
            <div className={classes.links}>{renderLinks()}</div>
        </AppBar>
    )
}

const Header = flowRight(withStyles(styles), inject('userStore'), observer)(HeaderPure)

export { Header }
