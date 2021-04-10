import { AppBar, createStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { flowRight } from 'lodash'
import React from 'react'
import { routes } from '../../stores/routing/routes'
import { CommonLink } from './link'
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
            position='sticky'
        >
            <CommonLink withHover={false} to={routes.homepage.url}>
                <Logo reversed />
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
