import { Card, createStyles, Modal, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { modalStyles } from '../../styles'
import { NewPredefinedHabitStore, modalState } from '../../../../stores/habits/new-habit/new-predefined-habit'
import { HabitsList } from '../../list/habits-list'
import { EditHabit } from '../../edit-habit/edit-habit'
import { CommonButton } from '../../../common/button'
import { CenteredContent } from '../../../common/centered-content'
import classNames from 'classnames'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme),
        cancel: {
            marginTop: 20
        },
        habitCard: {
            cursor: 'pointer'
        },
        cardModifier: {
            alignItems: 'initial'
        }
    })
}

class AddPredefinedHabitsModalPure extends React.Component {
    constructor(p) {
        super(p)
        const { transport, newHabitModalStore, uiStore } = this.props
        const { habitsTransport } = transport
        this.newPredefinedHabitStore = new NewPredefinedHabitStore({
            habitsTransport,
            newHabitModalStore,
            uiStore
        })
    }

    getHabitItemProps = (habit) => {
        const { classes } = this.props
        const { selectHabit } = this.newPredefinedHabitStore
        return {
            detailedView: true,
            showExecution: false,
            onClick: () => selectHabit(habit),
            classes: {
                root: classes.habitCard
            }
        }
    }

    render() {
        const { classes } = this.props
        const {
            state,
            getInitialValues,
            onSubmit,
            formProps,
            predefinedHabits,
            onHabitsListCancelClick
        } = this.newPredefinedHabitStore

        return (
            <Provider newPredefinedHabitStore={this.newPredefinedHabitStore}>
                <Modal open>
                    <div className={classes.rootContent}>
                        {state === modalState.PREDEFINED_HABITS && (
                            <CenteredContent className={classes.content}>
                                <Card className={classNames(classes.card, classes.cardModifier)}>
                                    <HabitsList
                                        habits={predefinedHabits}
                                        getHabitItemProps={this.getHabitItemProps}
                                    />
                                    <CommonButton
                                        className={classes.cancel}
                                        onClick={onHabitsListCancelClick}
                                        variant='contained'
                                        color='secondary'
                                    >
                                        Cancel
                                    </CommonButton>
                                </Card>
                            </CenteredContent>
                        )}
                        {state === modalState.PREDEFINED_HABIT_CREATION && (
                            <EditHabit
                                getInitialValues={getInitialValues}
                                onSubmit={onSubmit}
                                formProps={formProps}
                            />
                        )}
                    </div>
                </Modal>
            </Provider>
        )
    }
}

const AddPredefinedHabitsModal = flowRight(
    withStyles(styles),
    inject('newHabitModalStore', 'transport', 'uiStore'),
    observer
)(AddPredefinedHabitsModalPure)

export { AddPredefinedHabitsModal }
