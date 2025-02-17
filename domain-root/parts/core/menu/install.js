document.title = APP_UID

this.containerHost = element(document.body, "main")
this.containerHost.tabIndex = 1
this.container = this.containerHost.attachShadow({ mode: "open" })

this.styleSheet = new CSSStyleSheet()
this.container.adoptedStyleSheets.push(this.styleSheet)

this.toolbar = element(document.body, "nav")
this.toolbar.setAttribute("id", "toolbar")

this.homeButton = element(this.toolbar, "a")
this.homeButton.innerHTML = `<h1><img id=appicon src=icon.svg /><span class=label>${APP_UID}</span></h1>`
this.homeButton.setAttribute("href", "#0")
this.homeButton.setAttribute("id", "home")

this.toolbarSpacer = element(this.toolbar, "span")
this.toolbarSpacer.setAttribute("class", "spacer")

const showExpirimentalButtons = false

if (showExpirimentalButtons && navigator.share) {
 this.shareButton = element(this.toolbar, "button")
 this.shareButton.innerText = "➦"
 this.shareButton.setAttribute("id", "share")
 this.shareButton.onclick = () => navigator.share({ title: document.title, url: location.href }).catch(e => e.name == "AbortError" || console.error(e))
}

this.menuButton = element(this.toolbar, "button")
this.menuButton.innerText = "≡"


if (showExpirimentalButtons && document.fullscreenEnabled) {
 this.fullscreenButton = element(this.toolbar, "button")
 this.fullscreenButton.innerText = "⛶"
 this.fullscreenButton.setAttribute("id", "fullscreen")
 this.fullscreenButton.onclick = () => {
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
this.getNestedToolbar = () => {
 if (!nestedToolbar) {
  nestedToolbar = document.createElement("nested-toolbar")
  this.toolbarSpacer.before(nestedToolbar)
  nestedToolbar.setAttribute("id", "nested")
  shadow = nestedToolbar.attachShadow({ mode: "open" })
  shadow.styleSheet = new CSSStyleSheet()
  shadow.adoptedStyleSheets.push(shadow.styleSheet)
 }
 return shadow
}
this.destroyNestedToolbar = () => {
 nestedToolbar.remove()
 nestedToolbar = shadow = undefined
}

this.overlay = element(document.body, "menu")
this.overlay.setAttribute("id", "overlay")
this.overlay.tabIndex = 1

this.sidebar = element(this.overlay, "div")
this.sidebar.setAttribute("id", "sidebar")

this.appsSection = element(this.sidebar, "ul")
this.appsSection.setAttribute("id", "apps")
// this.appsTitle = element(this.appsSection, "h2")
// this.appsTitle.innerText = "Applications"
this.appNodes = this.parent.reduce((nodes, { uid: appUid }) => {
 const that = this.parent[appUid in this.parent ? appUid : 0]
 nodes[appUid] = element(this.appsSection, "li")
 nodes[appUid].setAttribute("class", "applink")
 nodes[appUid].innerHTML = `<span class=label>${appUid}</span><img src=https://${appUid}/icon.svg />`
 if (appUid === APP_UID) nodes[appUid].setAttribute("data-here", "true")
 else nodes[appUid].onclick = e => {
  e.preventDefault()
  let thatState = 0n
  // TODO: Extend this technique for all cross-origin links.
  for (const uid of Build.archive["core.parts"]["preferences.uri"].split(" ")) {
   if (uid in this && uid in that) thatState += this[uid].state * that[uid].conjunctionDivisor
  }
  location = "https://" + appUid + "#" + encode(thatState)
 }
 return nodes
}, {})

this.settingsSection = element(this.sidebar, "section")
this.settingsSection.setAttribute("id", "settings")
this.tagsLine = element(this.settingsSection, "span")
this.tagsLabel = element(this.tagsLine, "span")
this.tagsLabel.innerText = "Version"
this.tags = element(this.tagsLine, "span")
this.tags.setAttribute("id", "tags")
this.tagElements = []
for (const tag of Build.tags) {
 const tagElement = element(this.tags, "span")
 this.tagElements.push(tagElement)
 tagElement.innerHTML = tag
}

this.colorModeButton = element(this.settingsSection, "span")
this.colorModeButton.setAttribute("id", "colormode")
this.colorModeLabel = element(this.colorModeButton, "span")
this.colorModeLabel.innerText = "Color Mode"
this.colorModeBase = element(this.colorModeButton, "span")
this.colorModeBase.setAttribute("class", "base")
this.colorModeHandle = element(this.colorModeBase, "span")
this.colorModeHandle.setAttribute("class", "handle")