// The base HTML is always server-rendered, making this a hydrating task.

const manifestLink = document.querySelector('link[rel="manifest"]')

if (!manifestLink.hasAttribute("href"))
 manifestLink.setAttribute("href", `/${_.version}/manifest.json`)

const faviconLinks = document.querySelectorAll('link.favicon')

for (const faviconLink of faviconLinks)
 faviconLink.setAttribute("href", `data:image/png;base64,${_.application["part.png"]}`)

document.getElementById("img-css").innerHTML ||= _["images.css"]