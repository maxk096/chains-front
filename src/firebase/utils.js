export const promisifyFirebaseAuth = async (authPromise) => {
    const rejectionKey = Symbol()
    const valueOrError = await authPromise.catch((error) => {
        return { [rejectionKey]: true, error }
    })

    if (typeof valueOrError !== 'undefined' && valueOrError[rejectionKey]) {
        throw valueOrError.error
    } else {
        return valueOrError
    }
}