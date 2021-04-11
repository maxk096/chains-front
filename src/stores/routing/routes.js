class Route {
    constructor({ url, next = null }) {
        this.url = url
        this.next = next
    }
}

export const routes = {
    homepage: new Route({ url: '/' }),
    signup: new Route({ url: '/signup' }),
    signin: new Route({ url: '/signin' }),
    habits: new Route({ url: '/habits' }),
    notFound: new Route({ url: '*' })
}
