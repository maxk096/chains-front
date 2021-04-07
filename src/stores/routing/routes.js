class Route {
    constructor({ url, next = null }) {
        this.url = url
        this.next = next
    }
}

export const routes = {
    homepage: new Route({ url: '/' }),
    signup: new Route({ url: '/signup' }),
    login: new Route({ url: '/login' }),
    notFound: new Route({ url: '*' })
}
