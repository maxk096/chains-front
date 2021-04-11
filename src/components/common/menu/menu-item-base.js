import React, { Component } from 'react'
import { observer } from 'mobx-react'
import cl from 'classnames'
import { withStyles, createStyles, MenuItem } from '@material-ui/core'
import { flowRight } from 'lodash'
import { MenuCtx } from './menu-context'

const styles = (theme) => {
    return createStyles({
        root: {
            color: theme.palette.primary.light,
            outline: 'none',
            minWidth: 150,
            height: '100%',
            fontWeight: 500,
            paddingTop: 8,
            paddingBottom: 8,
            cursor: 'pointer',
            transitionProperty: 'color, background',
            transitionDuration: '100ms',
            '&:hover': {
                background: theme.palette.background.dark
            },
            '&:hover $title, &:hover $iconRoot': {
                color: theme.palette.primary.dark
            }
        },
        innerRoot: {
            display: 'flex',
            alignItems: 'center',
            height: '100%'
        },
        iconRoot: {
            width: 21,
            height: 21,
            marginRight: 15
        },
        title: {}
    })
}

class MenuItemBasePure extends Component {
    static defaultProps = {
        closeMenuOnClick: true
    }

    static contextType = MenuCtx

    onClick = async (event) => {
        const { onClick, closeMenuOnClick } = this.props

        if (closeMenuOnClick) {
            this.context.closeMenu()
        }

        await onClick?.(event)
    }

    render() {
        const { closeMenuOnClick, renderItemIcon, title, classes, className, ...rest } = this.props
        return (
            <MenuItem {...rest} onClick={this.onClick} className={cl(className, classes.root)} button={false}>
                <div className={classes.innerRoot}>
                    {renderItemIcon?.({ className: classes.iconRoot })}
                    <div className={classes.title}>{title}</div>
                </div>
            </MenuItem>
        )
    }
}

export const MenuItemBase = flowRight(withStyles(styles), observer)(MenuItemBasePure)
