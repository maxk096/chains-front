import { createStyles, MenuItem, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { CommonForm } from '../../common/form/form'
import { habitType } from '../../../stores/habits/utils'
import { FormTextField } from '../../common/form/text-field'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { ToggleButton } from '@material-ui/lab'
import { habitIcon } from '../../../stores/habits/icons'
import { LoadingButton } from '../../common/loading-button'
import { FormIconPicker } from '../../common/form/form-icon-picker'
import { FormErrorMessage } from '../../common/form/form-error-message'
import { WeekdayPicker } from '../../common/weekday-picker'
import Select from '@material-ui/core/Select'
import { action, makeObservable, observable } from 'mobx'
import classNames from 'classnames'
import { CommonErrorMessage } from '../../common/error-message'
import { CommonButton } from '../../common/button'

const styles = (theme) => {
    return createStyles({
        form: {
            width: '100%',
            color: theme.palette.primary.main
        },
        toogleBtn: {
            textTransform: 'none',
            fontWeight: 'normal',
            color: theme.palette.primary.main
        },
        nameWrap: {
            display: 'flex',
            alignItems: 'center'
        },
        name: {
            flex: 1,
            marginLeft: 10
        },
        label: {
            fontSize: '1rem'
        },
        typeLabel: {
            marginBottom: 5
        },
        labeledField: {},
        labeledFieldWrap: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 5,
            '& $label': {
                marginRight: 10
            },
            '& $labeledField': {
                flexGrow: 0
            }
        },
        contolBtns: {
            display: 'grid',
            columnGap: 20,
            gridTemplateColumns: '1fr 1fr',
            marginTop: 15
        },
        controlBtn: {
            flex: 1
        }
    })
}

const executionDaysTypeValues = {
    EVERY_DAY: {
        type: 'EVERY_DAY',
        name: 'Every day',
        getDays: () => [1, 2, 3, 4, 5, 6, 7]
    },
    WEEKDAYS: {
        type: 'WEEKDAYS',
        name: 'Weekdays',
        getDays: () => [1, 2, 3, 4, 5]
    },
    WEEKENDS: {
        type: 'WEEKENDS',
        name: 'Weekends',
        getDays: () => [6, 7]
    },
    CUSTOM: {
        type: 'CUSTOM',
        name: 'Custom'
    }
}

class EditHabitFormPure extends React.Component {
    constructor(p) {
        super(p)
        this.handleExecutionDaysTypeChange(executionDaysTypeValues.EVERY_DAY.type)
        makeObservable(this, {
            executionDaysType: observable,
            handleExecutionDaysTypeChange: action
        })
    }

    setFieldValueWithValidation = (field, value) => {
        const { setFieldValue, validateField, setFieldTouched } = this.props
        setFieldTouched(field)
        validateField(field)
        setFieldValue(field, value)
    }

    onTypeChange = (_, type) => {
        this.setFieldValueWithValidation('type', type)
    }

    onExecutionDaysChange = (_, executionDays) => {
        this.setFieldValueWithValidation('executionDays', executionDays)
        this.handleExecutionDaysTypeChange(executionDaysTypeValues.CUSTOM.type)
    }

    onExecutionDaysTypeChange = (ev) => {
        this.handleExecutionDaysTypeChange(ev.target.value)
    }

    handleExecutionDaysTypeChange = (type) => {
        const { setFieldValue } = this.props
        this.executionDaysType = type
        if (this.executionDaysType === executionDaysTypeValues.CUSTOM.type) {
            return
        }
        const days = executionDaysTypeValues[this.executionDaysType].getDays()
        setFieldValue('executionDays', days)
    }

    render() {
        const { classes, values, isSubmitting, formError, onCancelClick } = this.props
        const { type, icon, executionDays } = values

        return (
            <CommonForm className={classes.form}>
                <div className={classNames(classes.label, classes.typeLabel)}>I want to ...</div>
                <ToggleButtonGroup
                    exclusive
                    onChange={this.onTypeChange}
                    value={type}
                    orientation='horizontal'
                >
                    <ToggleButton
                        disabled={isSubmitting}
                        className={classes.toogleBtn}
                        value={habitType.BUILD}
                    >
                        Build a habit
                    </ToggleButton>
                    <ToggleButton
                        disabled={isSubmitting}
                        className={classes.toogleBtn}
                        value={habitType.BREAK}
                    >
                        Break a habit
                    </ToggleButton>
                </ToggleButtonGroup>
                <FormErrorMessage name='type' />
                <div className={classes.nameWrap}>
                    <FormIconPicker name='icon' selectedIcon={habitIcon[icon]} icons={habitIcon} />
                    <FormTextField
                        wrapClass={classes.name}
                        name='name'
                        label='Name *'
                        withErrorMessage={false}
                    />
                </div>
                <FormErrorMessage name='name' />
                <FormTextField name='question' label='Question' />
                <FormTextField name='reason' label='Reason' />
                <div className={classes.labeledFieldWrap}>
                    <div className={classes.label}>Execution days:</div>
                    <Select
                        className={classes.labeledField}
                        autoWidth
                        value={this.executionDaysType}
                        onChange={this.onExecutionDaysTypeChange}
                        disabled={isSubmitting}
                    >
                        {Object.values(executionDaysTypeValues).map((dayType) => (
                            <MenuItem key={dayType.type} value={dayType.type}>
                                {dayType.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <WeekdayPicker
                    value={executionDays}
                    onChange={this.onExecutionDaysChange}
                    disabled={isSubmitting}
                />
                <FormErrorMessage name='executionDays' />
                <CommonErrorMessage>{formError}</CommonErrorMessage>
                <div className={classes.contolBtns}>
                    <CommonButton
                        variant='contained'
                        color='secondary'
                        disabled={isSubmitting}
                        onClick={onCancelClick}
                        className={classes.controlBtn}
                    >
                        Cancel
                    </CommonButton>
                    <LoadingButton
                        pending={isSubmitting}
                        variant='contained'
                        color='primary'
                        type='submit'
                        className={classes.controlBtn}
                    >
                        Save
                    </LoadingButton>
                </div>
            </CommonForm>
        )
    }
}

const EditHabitForm = flowRight(withStyles(styles), observer)(EditHabitFormPure)

export { EditHabitForm }
