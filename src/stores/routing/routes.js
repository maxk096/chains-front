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
    notFound: new Route({ url: '*' })
}
