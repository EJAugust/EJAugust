document.title = app.host

// Create a container for app content.
app.containerHost = element(document.body, "main")
app.containerHost.tabIndex = 1
app.container = app.containerHost.attachShadow({ mode: "open" })
app.styleSheet = new CSSStyleSheet()
app.container.adoptedStyleSheets.push(app.styleSheet)

// Create the toolbar.
app.toolbar = element(document.body, "nav")
app.toolbar.setAttribute("id", "toolbar")

app.homeButton = element(app.toolbar, "button")
app.homeButton.setAttribute("id", "home")
app.homeButton.onclick = () => app[0].setLayer(LAYER, 0n)
app.homeIcon = element(app.homeButton, "img")
app.homeIcon.setAttribute("id", "home-icon")
app.homeIcon.setAttribute("src", await app.resolve("icon.uri", "fallback-icon.svg"))
app.homeLabel = element(app.homeButton, "span")
app.homeLabel.setAttribute("id", "home-label")
app.homeLabel.textContent = app.niceName ?? app.host


app.toolbarSpacer = element(app.toolbar, "span")
app.toolbarSpacer.setAttribute("class", "spacer")

app.showFullScreenControl = true
app.showShareButton = false

if (app.showShareButton && navigator.share) {
 app.shareButton = element(app.toolbar, "button")
 app.shareButton.innerText = "➦"
 app.shareButton.setAttribute("id", "share")
 app.shareButton.onclick = () => navigator.share({ title: document.title, url: location.href }).catch(e => e.name == "AbortError" || console.error(e))
}

app.menuButton = element(app.toolbar, "button")
app.menuButton.setAttribute("class", "btn")
app.menuButton.setAttribute("id", "menu-button")
app.menuButton.innerText = "≡"

if (app.showFullScreenControl && document.fullscreenEnabled) {
 app.fullscreenButton = element(app.toolbar, "button")
 app.fullscreenButton.innerText = "⛶"
 app.fullscreenButton.setAttribute("id", "fullscreen")
 app.fullscreenButton.setAttribute("class", "btn")
 app.fullscreenButton.onclick = () => {
  if (!document.fullscreenElement) {
   if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
   } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen()
   } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
   }
  } else {
   if (document.exitFullscreen) {
    document.exitFullscreen()
   } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
   } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
   }
  }
 }
}

let nestedToolbar, shadow

app.getNestedToolbar = () => {
 if (!nestedToolbar) {
  nestedToolbar = document.createElement("nested-toolbar")
  app.toolbarSpacer.before(nestedToolbar)
  nestedToolbar.setAttribute("id", "nested")
  shadow = nestedToolbar.attachShadow({ mode: "open" })
  shadow.styleSheet = new CSSStyleSheet()
  shadow.adoptedStyleSheets.push(shadow.styleSheet)
 }
 return shadow
}

app.destroyNestedToolbar = () => {
 nestedToolbar.remove()
 nestedToolbar = shadow = undefined
}

app.menu = element(document.body, "menu")
app.menu.setAttribute("id", "menu")
app.menu.tabIndex = 1

app.sidebar = element(app.menu, "div")
app.sidebar.setAttribute("id", "sidebar")

app.appsSection = element(app.sidebar, "ul")
app.appsSection.setAttribute("id", "apps")

app.appNodes = {}
for (const destinationApp of client) {
 const appHost = destinationApp.host
 const icon_uri = await destinationApp.resolve("icon.uri", "fallback-icon.svg")
 app.appNodes[appHost] = element(app.appsSection, "li")
 app.appNodes[appHost].setAttribute("class", "applink")
 app.appNodes[appHost].innerHTML = `<img src="https://${appHost}/${icon_uri}" /><span class=label>${destinationApp.niceName ?? appHost}</span>`
 if (appHost === app.host) app.appNodes[appHost].setAttribute("data-here", "true")
 else app.appNodes[appHost].onclick = e => {
  e.preventDefault()
  let thatState = 0n
  for (const host of read("preferences.host").split(/\s+/g)) {
   if (host in app && host in destinationApp) thatState += app[host].state[LAYER] * destinationApp[host].conjunctionDivisor
  }
  const hash = app.encodeState(thatState)
  if (Framework.isDebug) {
   location.hash = hash
   worker.postMessage({ code: "setDebugHost", host: appHost })
  } else location = "https://" + appHost + "#" + hash
 }
}

app.settingsSection = element(app.sidebar, "section")
app.settingsSection.setAttribute("id", "settings")
app.tagsLine = element(app.settingsSection, "span")
app.tagsLabel = element(app.tagsLine, "span")
app.tagsLabel.innerText = "Version"
app.tags = element(app.tagsLine, "span")
app.tags.setAttribute("id", "tags")
app.tagElements = []

for (const tag of Framework.tags) {
 const tagElement = element(app.tags, "span")
 app.tagElements.push(tagElement)
 tagElement.innerHTML = tag
}

app.colorModeButton = element(app.settingsSection, "span")
app.colorModeButton.setAttribute("id", "colormode")
app.colorModeLabel1 = element(app.colorModeButton, "span")
app.colorModeLabel1.innerText = "Color Mode"
app.colorModeLabel1.setAttribute("id", "label1")
app.colorModeLabel2 = element(app.colorModeButton, "span")
app.colorModeLabel2.setAttribute("id", "label2")
app.colorModeBase = element(app.colorModeButton, "span")
app.colorModeBase.setAttribute("class", "base")
app.colorModeHandle = element(app.colorModeBase, "span")
app.colorModeHandle.setAttribute("class", "handle")

const globalCSS = read("style.css")
const customCSS = await app.resolve("menu.css") ?? ""
const staticStyleSheet = new CSSStyleSheet()
staticStyleSheet.replaceSync(globalCSS + customCSS)
app.colorModeStyleSheet = new CSSStyleSheet()

document.adoptedStyleSheets.push(
 staticStyleSheet,
 app.colorModeStyleSheet,
)