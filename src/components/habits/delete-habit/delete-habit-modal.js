import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, createStyles, Modal, withStyles } from '@material-ui/core'
import { modalStyles } from '../styles'
import { CenteredContent } from '../../common/centered-content'
import classNames from 'classnames'
import { CommonButton } from '../../common/button'
import { LoadingButton } from '../../common/loading-button'
import { CommonErrorMessage } from '../../common/error-message'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme),
        cardModifier: {
            alignItems: 'initial'
        },
        info: {
            marginBottom: 20
        },
        deleteBtn: {
            backgroundColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.error.light
            }
        },
        rootContent: {
            height: '100%',
            outline: 'none'
        }
    })
}

const DeleteHabitModalPure = (props) => {
    const { deleteHabitStore, classes } = props
    const { isOpen, getErrorState, isLoading, onCancelClick, onDelete, habitClone } = deleteHabitStore

    return (
        <Modal open={isOpen}>
            <div className={classes.rootContent}>
                {isOpen && (
                    <CenteredContent className={classes.content}>
                        <Card className={classNames(classes.card, classes.cardModifier)}>
                            <div className={classes.info}>Do you want to delete "{habitClone.name}"?</div>
                            <div className={classes.controls}>
                                <CommonButton
                                    onClick={onCancelClick}
                                    disabled={isLoading}
                                    variant='contained'
                                    color='secondary'
                                >
                                    Cancel
                                </CommonButton>
                                <LoadingButton
                                    className={classes.deleteBtn}
                                    onClick={onDelete}
                                    pending={isLoading}
                                    variant='contained'
                                    component='label'
                                >
                                    Delete
                                </LoadingButton>
                                <CommonErrorMessage>{getErrorState()}</CommonErrorMessage>
                            </div>
                        </Card>
                    </CenteredContent>
                )}
            </div>
        </Modal>
    )
}

export const DeleteHabitModal = flowRight(
    inject('deleteHabitStore'),
    withStyles(styles),
    observer
)(DeleteHabitModalPure)
