export class UiStore {
    enqueueSnackbar = null

    registerEnqueueSnackbar = (enqueueSnackbar) => {
        this.enqueueSnackbar = enqueueSnackbar
    }

    /**
     * Shows snackbar.
     * @param {('success'|'error'|'warning'|'info')} variant
     * @param {string} message
     */
    showSnackbar = (variant, message) => {
        this.enqueueSnackbar(message, {
            variant,
            autoHideDuration: 2500
        })
    }
}
