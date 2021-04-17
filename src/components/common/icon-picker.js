import { createStyles, IconButton, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React, { useState } from 'react'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import Popover from '@material-ui/core/Popover'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'inline-block'
        },
        icon: {
            width: '1em',
            height: '1em',
            color: theme.habitIconColor
        },
        noSelectedIcon: {
            color: 'inherit'
        },
        pickerIcons: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto',
            gap: '5px'
        }
    })
}

const IconPickerPure = (props) => {
    const { classes, icons, selectedIcon: SelectedIcon, onChange, disabled } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = !!anchorEl
    const openPopover = (ev) => setAnchorEl(ev.currentTarget)
    const closePopover = () => setAnchorEl(null)
    const onChangeInternal = (key) => (ev) => {
        onChange(ev, key)
        closePopover()
    }

    const renderIcons = () => {
        return Object.entries(icons).map(([key, Icon]) => {
            return (
                <IconButton key={key} name={key} onClick={onChangeInternal(key)}>
                    <Icon className={classes.icon} />
                </IconButton>
            )
        })
    }

    return (
        <div className={classes.root}>
            <IconButton onClick={openPopover} disabled={disabled}>
                {SelectedIcon ? (
                    <SelectedIcon className={classes.icon} />
                ) : (
                    <SelectAllIcon className={classNames(classes.icon, classes.noSelectedIcon)} />
                )}
            </IconButton>
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <div className={classes.pickerIcons}>{renderIcons()}</div>
            </Popover>
        </div>
    )
}

const IconPicker = flowRight(withStyles(styles))(IconPickerPure)

export { IconPicker }
