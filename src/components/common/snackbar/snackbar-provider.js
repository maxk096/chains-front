import React from 'react'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import { createStyles } from '@material-ui/core'
import { flowRight } from 'lodash'

const styles = (theme) => {
    return createStyles({
        collapseWrapperInner: {
            [theme.breakpoints.down('sm')]: {
                width: '70%'
            }
        }
    })
}

class AppSnackbarProviderPure extends React.Component {
    render() {
        const { children, classes } = this.props

        return (
            <SnackbarProvider
                maxSnack={1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                classes={classes}
            >
                {children}
            </SnackbarProvider>
        )
    }
}

export const AppSnackbarProvider = flowRight(withStyles(styles), observer)(AppSnackbarProviderPure)
