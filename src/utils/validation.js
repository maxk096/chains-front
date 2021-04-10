import * as yup from 'yup'

export const initValidationMethods = () => {
    yup.addMethod(yup.string, 'namedRequired', function (fieldName) {
        return yup.string().required(`${fieldName} is required.`)
    })
}
