import { Card, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { CenteredContent } from '../../common/centered-content'
import { Formik } from 'formik'
import { newHabitValidationSchema } from '../../../stores/habits/utils'
import { EditHabitForm } from './edit-habit-form'

const styles = (theme) => {
    return createStyles({
        root: {
            height: '100%'
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 400,
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                minWidth: 'initial',
            }
        }
    })
}

class EditHabitPure extends React.Component {
    getInitialValues = () => {
        return {
            name: '',
            type: null,
            icon: '',
            question: '',
            reason: '',
            executionDays: [],
            notificationTime: ''
        }
    }

    render() {
        const { classes, onSubmit } = this.props

        return (
            <CenteredContent className={classes.root}>
                <Card className={classes.card}>
                    <Formik
                        initialValues={this.getInitialValues()}
                        validationSchema={newHabitValidationSchema}
                        onSubmit={onSubmit}
                        component={EditHabitForm}
                    />
                </Card>
            </CenteredContent>
        )
    }
}

const EditHabit = flowRight(withStyles(styles), observer)(EditHabitPure)

export { EditHabit }
