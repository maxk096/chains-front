/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(({ url }) => /fonts\.(googleapis|gstatic)\.com/.test(url.host), new StaleWhileRevalidate())

registerRoute(({ url }) => url.pathname.endsWith('manifest.json'), new StaleWhileRevalidate())
