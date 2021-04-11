import { createStyles, IconButton, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import { routes } from '../../../stores/routing/routes'
import { CommonMenu } from '../menu/menu'
import SettingsIcon from '@material-ui/icons/Settings'
import { MenuItemBase } from '../menu/menu-item-base'
import { withRouter } from 'react-router-dom'

const styles = (theme) => {
    return createStyles({
        menuIcon: {
            color: theme.header.menu.iconColor,
            padding: 6
        }
    })
}

const UserMenuPure = (props) => {
    const { userStore, history, classes } = props
    const { onSignOut } = userStore
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const openHabits = () => {
        history.push(routes.habits.url)
    }

    const renderUserMenuItems = () => {
        return [
            <MenuItemBase key='habits' title={'My habits'} onClick={openHabits} />,
            <MenuItemBase key='sign-out' title={'Sign out'} onClick={onSignOut} />
        ]
    }

    return (
        <CommonMenu
            renderMenuItems={renderUserMenuItems}
            open={isMenuOpen}
            closeMenu={closeMenu}
            onClose={closeMenu}
        >
            {({ menuAnchorRef }) => {
                return (
                    <IconButton className={classes.menuIcon} onClick={() => setIsMenuOpen(true)}>
                        <SettingsIcon ref={menuAnchorRef} />
                    </IconButton>
                )
            }}
        </CommonMenu>
    )
}

const UserMenu = flowRight(withStyles(styles), withRouter, inject('userStore'), observer)(UserMenuPure)

export { UserMenu }
