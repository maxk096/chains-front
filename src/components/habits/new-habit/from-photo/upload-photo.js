import { Card, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { loadingState, errorState } from '../../../../stores/habits/new-habit/new-habit-from-photo'
import { modalStyles } from '../../styles'
import { CenteredContent } from '../../../common/centered-content'
import { CommonButton } from '../../../common/button'
import { LoadingButton } from '../../../common/loading-button'
import { CommonErrorMessage } from '../../../common/error-message'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        rootContent: {
            height: '100%',
            outline: 'none'
        },
        ...modalStyles(theme),
        cardModifier: {
            alignItems: 'initial'
        },
        info: {
            marginBottom: 20
        }
    })
}

class UploadPhotoPure extends React.Component {
    render() {
        const { classes, newHabitFromPhotoStore } = this.props
        const { onFileChange, hasLoadingState, getErrorState, onUploadCancelClick } = newHabitFromPhotoStore
        const isDecoding = hasLoadingState(loadingState.IMAGE_DECODING)
        return (
            <CenteredContent className={classes.content}>
                <Card className={classNames(classes.card, classes.cardModifier)}>
                    <div className={classes.info}>Upload photo with your habits.</div>
                    <div className={classes.controls}>
                        <CommonButton
                            onClick={onUploadCancelClick}
                            disabled={isDecoding}
                            variant='contained'
                            color='secondary'
                        >
                            Cancel
                        </CommonButton>
                        <LoadingButton
                            pending={isDecoding}
                            variant='contained'
                            color='primary'
                            component='label'
                        >
                            Upload photo
                            <input type='file' hidden accept='image/*' onChange={onFileChange} />
                        </LoadingButton>
                        <CommonErrorMessage>
                            {getErrorState(errorState.IMAGE_DECODING_ERROR)}
                        </CommonErrorMessage>
                    </div>
                </Card>
            </CenteredContent>
        )
    }
}

const UploadPhoto = flowRight(withStyles(styles), inject('newHabitFromPhotoStore'), observer)(UploadPhotoPure)

export { UploadPhoto }
