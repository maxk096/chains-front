import * as yup from 'yup'

yup.addMethod(yup.string, 'namedRequired', function (fieldName) {
    return this.required(`${fieldName} is required.`)
})

yup.addMethod(yup.mixed, 'namedRequired', function (fieldName) {
    return this.required(`${fieldName} is required.`)
})

yup.addMethod(yup.array, 'namedRequired', function (fieldName) {
    return this.required(`${fieldName} is required.`)
})
