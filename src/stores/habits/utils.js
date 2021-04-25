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
    name: yup.string().namedRequired('Name'),
    question: yup.string(),
    reason: yup.string(),
    executionDays: yup
        .array(yup.number())
        .min(1, 'Select at least one execution day.')
        .namedRequired('Execution days'),
    notificationTime: yup.string()
})

export const getDefaultHabit = () => {
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

export const HABIT_CREATED_AT_FORMAT = 'YYYY-MM-DD hh:mm:ss'

export const createHabitCreatedAt = () => {
    return dayjs().format(HABIT_CREATED_AT_FORMAT)
}
