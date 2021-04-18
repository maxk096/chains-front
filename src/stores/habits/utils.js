import * as yup from 'yup'
import { habitIcon } from './icons'

export const habitType = {
    BUILD: 'BUILD',
    BREAK: 'BREAK'
}

export const newHabitValidationSchema = yup.object().shape({
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
