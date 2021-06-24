import * as yup from 'yup'
import dayjs from 'dayjs'
import { habitIcon } from './icons'

export const habitType = {
    BUILD: 'BUILD',
    BREAK: 'BREAK'
}

export const habitValidationSchema = yup.object().shape({
    type: yup.mixed().oneOf(Object.values(habitType), 'Type is required.').namedRequired('Type'),
    icon: yup.mixed().oneOf(Object.keys(habitIcon)),
    name: yup.string().trim().namedRequired('Name'),
    question: yup.string().trim(),
    reason: yup.string().trim(),
    executionDays: yup
        .array(yup.number())
        .min(1, 'Select at least one execution day.')
        .namedRequired('Execution days')
})

export const getDefaultHabit = () => {
    return {
        name: '',
        type: null,
        icon: '',
        question: '',
        reason: '',
        executionDays: []
    }
}

export const createHabitCreatedAt = () => {
    return dayjs().toISOString()
}
