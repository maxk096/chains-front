import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Menu, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import { MenuCtx } from './menu-context'

const styles = (theme) => {
    return createStyles({})
}
const MenuCtxProvider = MenuCtx.Provider

class CommonMenuPure extends Component {
    menuAnchorRef = React.createRef()
    menuProvided
    menuContextValue
    menuListProps

    constructor(p) {
        super(p)
        const { closeMenu } = this.props
        this.menuProvided = { menuAnchorRef: this.setMenuAnchorRef }
        this.menuContextValue = { closeMenu }
    }

    setMenuAnchorRef = (menuAnchorEl) => {
        this.menuAnchorRef.current = menuAnchorEl
    }

    render() {
        const { children, closeMenu, renderMenuItems, ...rest } = this.props

        return (
            <React.Fragment>
                {children(this.menuProvided)}
                <MenuCtxProvider value={this.menuContextValue}>
                    <Menu {...rest} anchorEl={this.menuAnchorRef.current}>
                        {renderMenuItems()}
                    </Menu>
                </MenuCtxProvider>
            </React.Fragment>
        )
    }
}

const CommonMenu = flowRight(withStyles(styles), observer)(CommonMenuPure)

export { CommonMenu }
