import { Card, createStyles, FormControlLabel, FormGroup, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { modalStyles } from '../../styles'
import { CenteredContent } from '../../../common/centered-content'
import { CommonButton } from '../../../common/button'
import classNames from 'classnames'
import { CommonCheckbox } from '../../../common/checkbox'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme, { controls: 3 }),
        rootContent: {
            height: '100%',
            outline: 'none'
        },
        cardModifier: {
            alignItems: 'initial'
        },
        info: {
            marginBottom: 20
        },
        controlsModifier: {
            marginTop: 20
        }
    })
}

class DecodedHabitsPure extends React.Component {
    render() {
        const { classes, newHabitFromPhotoStore } = this.props
        const {
            decodedHabits,
            onCancelHabitsList,
            onHabitSelectChange,
            isHabitSelected,
            onCreateSelectedHabits,
            onHabitCreationFinish
        } = newHabitFromPhotoStore
        return (
            <CenteredContent className={classes.content}>
                <Card className={classNames(classes.card, classes.cardModifier)}>
                    <div className={classes.info}>Select the habits which you want to merge and create.</div>
                    <FormGroup>
                        {decodedHabits.map((habit) => (
                            <FormControlLabel
                                key={habit.id}
                                label={habit.name}
                                control={
                                    <CommonCheckbox
                                        color='primary'
                                        checked={isHabitSelected(habit)}
                                        onChange={onHabitSelectChange(habit)}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                    <div className={classNames(classes.controls, classes.controlsModifier)}>
                        <CommonButton onClick={onCancelHabitsList} variant='contained' color='secondary'>
                            Cancel
                        </CommonButton>
                        <CommonButton onClick={onCreateSelectedHabits} variant='contained' color='primary'>
                            Create
                        </CommonButton>
                        <CommonButton onClick={onHabitCreationFinish} variant='contained' color='primary'>
                            Finish
                        </CommonButton>
                    </div>
                </Card>
            </CenteredContent>
        )
    }
}

export const DecodedHabits = flowRight(
    withStyles(styles),
    inject('newHabitFromPhotoStore'),
    observer
)(DecodedHabitsPure)
