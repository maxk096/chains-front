class Route {
    constructor({ url, next = null }) {
        this.url = url
        this.next = this.prepareNext(next)
    }

    prepareNext(next) {
        if (!next) {
            return next
        }
        Object.values(next).forEach((route) => {
            route.url = this.url + route.url
        })
        return next
    }
}

export const routes = {
    homepage: new Route({ url: '/' }),
    signup: new Route({ url: '/signup' }),
    signin: new Route({ url: '/signin' }),
    habits: new Route({
        url: '/habits',
        next: {
            habit: new Route({ url: '/:habitId' })
        }
    }),
    notFound: new Route({ url: '*' })
}
