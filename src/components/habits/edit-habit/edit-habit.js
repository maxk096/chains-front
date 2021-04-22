import { Card, createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { CenteredContent } from '../../common/centered-content'
import { Formik } from 'formik'
import { habitValidationSchema } from '../../../stores/habits/utils'
import { EditHabitForm } from './edit-habit-form'
import { modalStyles } from '../styles'

const styles = (theme) => {
    return createStyles({
        ...modalStyles(theme)
    })
}

class EditHabitPure extends React.Component {
    formComponent = observer((props) => {
        const { formProps } = this.props
        return <EditHabitForm {...props} {...formProps} />
    })

    render() {
        const { classes, onSubmit, getInitialValues } = this.props

        return (
            <CenteredContent className={classes.content}>
                <Card className={classes.card}>
                    <Formik
                        initialValues={getInitialValues()}
                        validationSchema={habitValidationSchema}
                        onSubmit={onSubmit}
                        component={this.formComponent}
                    />
                </Card>
            </CenteredContent>
        )
    }
}

const EditHabit = flowRight(withStyles(styles), observer)(EditHabitPure)

export { EditHabit }
