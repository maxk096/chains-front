import { AppBar, createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { routes } from '../../stores/routing/routes'
import { HeaderLink } from './header-link'
import { Logo } from './logo'

const styles = (theme) => {
    return createStyles({
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
            [theme.breakpoints.down('sm')]: {
                margin: '0 5px'
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
    const { isTransparent, classes, userStore } = props
    const { user, onSignOut } = userStore

    const onSingOutClick = (ev) => {
        ev.preventDefault()
        onSignOut()
    }

    const renderLinks = () => {
        if (user) {
            return (
                <>
                    <HeaderLink className={classes.link} to={routes.habits.url}>
                        Habits
                    </HeaderLink>
                    <HeaderLink className={classes.link} to={'#'} onClick={onSingOutClick}>
                        Sign out
                    </HeaderLink>
                </>
            )
        }

        return (
            <>
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
