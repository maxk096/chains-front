import {
    Card,
    CircularProgress,
    createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Modal,
    withStyles
} from '@material-ui/core'
import { flowRight } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { dataExportState, DataExportStore } from '../../../stores/settings/data-export-store'
import { CenteredContent } from '../centered-content'
import { modalStyles } from '../../habits/styles'
import classNames from 'classnames'
import { CommonButton } from '../button'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import NotesIcon from '@material-ui/icons/Notes'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme),
        cardModifier: {
            alignItems: 'initial'
        },
        itemSecondary: {
            color: theme.palette.error.main
        }
    })
}

class SettingsModalPure extends React.Component {
    constructor(p) {
        super(p)
        const { transport } = this.props
        const { habitsTransport } = transport
        this.dataExportStore = new DataExportStore({ habitsTransport })
    }

    render() {
        const { classes, closeSettings } = this.props
        const { exportDataAsJson, exportDataAsCsv, getErrorState, hasLoadingState } = this.dataExportStore
        const isExortingJson = hasLoadingState(dataExportState.EXPORTING_DATA_AS_JSON)
        const exortingJsonError = getErrorState(dataExportState.EXPORTING_DATA_AS_JSON)
        const isExortingCsv = hasLoadingState(dataExportState.EXPORTING_DATA_AS_CSV)
        const exportingCsvError = getErrorState(dataExportState.EXPORTING_DATA_AS_CSV)

        return (
            <Modal open>
                <div className={classes.rootContent}>
                    <CenteredContent className={classes.content}>
                        <Card className={classNames(classes.card, classes.cardModifier)}>
                            <List subheader={<ListSubheader>Settings</ListSubheader>}>
                                <ListItem
                                    component='a'
                                    button
                                    onClick={exportDataAsJson}
                                    disabled={isExortingJson}
                                >
                                    <ListItemIcon>
                                        {isExortingJson ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <AccountTreeIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ secondary: classes.itemSecondary }}
                                        primary='Export data as JSON'
                                        secondary={exortingJsonError}
                                    />
                                </ListItem>
                                <ListItem
                                    component='a'
                                    button
                                    onClick={exportDataAsCsv}
                                    disabled={isExortingCsv}
                                >
                                    <ListItemIcon>
                                        {isExortingCsv ? <CircularProgress size={24} /> : <NotesIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ secondary: classes.itemSecondary }}
                                        primary='Export data as CSV'
                                        secondary={exportingCsvError}
                                    />
                                </ListItem>
                            </List>
                            <CommonButton onClick={closeSettings} variant='contained' color='secondary'>
                                Close
                            </CommonButton>
                        </Card>
                    </CenteredContent>
                </div>
            </Modal>
        )
    }
}

export const SettingsModal = flowRight(withStyles(styles), inject('transport'), observer)(SettingsModalPure)
