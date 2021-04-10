import { action, computed, makeObservable, observable } from 'mobx'

export class LoadingStore {
    static DEFAULT_LOADING_KEY = Symbol('default_loading_key')
    static DEFAULT_ERROR_KEY = Symbol('default_error_key')

    loadingSet = new Set()
    errorMap = new Map()

    constructor() {
        makeObservable(this, {
            loadingSet: observable,
            errorMap: observable,
            isLoading: computed,
            hasError: computed,
            addLoadingState: action,
            deleteLoadingState: action,
            clearLoadingState: action,
            addErrorState: action,
            deleteErrorState: action,
            clearErrorState: action
        })
    }

    get isLoading() {
        return !!this.loadingSet.size
    }

    getLoadingState = (key = LoadingStore.DEFAULT_LOADING_KEY) => {
        return this.loadingSet.get(key)
    }

    startLoading = () => {
        this.addLoadingState(LoadingStore.DEFAULT_LOADING_KEY)
    }

    stopLoading = () => {
        this.deleteLoadingState(LoadingStore.DEFAULT_LOADING_KEY)
    }

    addLoadingState = (key) => {
        this.loadingSet.add(key)
    }

    deleteLoadingState = (key = LoadingStore.DEFAULT_LOADING_KEY) => {
        this.loadingSet.delete(key)
    }

    clearLoadingState = () => {
        this.loadingSet.clear()
    }

    get hasError() {
        return !!this.errorMap.size
    }

    getErrorState = (key = LoadingStore.DEFAULT_ERROR_KEY) => {
        return this.errorMap.get(key)
    }

    setErrorState = (state) => {
        this.addErrorState(LoadingStore.DEFAULT_ERROR_KEY, state)
    }

    addErrorState = (key, state) => {
        this.errorMap.set(key, state)
    }

    deleteErrorState = (key = LoadingStore.DEFAULT_ERROR_KEY) => {
        this.errorMap.delete(key)
    }

    clearErrorState = () => {
        this.errorMap.clear()
    }
}
