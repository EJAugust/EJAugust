const url = new URL(REQUEST_URL)
const devSuffix = "localhost:3000"
const host = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host

if (!(host in _.applications))
 throw `Unsupported application '${host}'.`

const pathname = url.pathname
const newRouteID = decodeRoute(pathname)

if (_.application?.key !== host)
 _.application = getPartFromDomains(host.split("."))

if (_.routeID !== newRouteID)
 _.setRouteID(newRouteID)