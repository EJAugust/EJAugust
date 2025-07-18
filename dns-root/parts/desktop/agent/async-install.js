Object.defineProperties(agent, {
 isMac: { value: nav.userAgent.indexOf("Mac") > -1 },
 isSafari: { value: /^((?!chrome|android).)*safari/i.test(nav.userAgent) }
})

element = (parentElement, tagname) => parentElement.appendChild(document.createElement(tagname))

svg = (parentElement, ...paths) => {
 const result = parentElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
 result.setAttribute("viewBox", "-1 -1 2 2")
 result.setAttribute("class", "nav-button")
 result.innerHTML = paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")
 return result
}

Object.defineProperty(_, "noop", {
 value(event) {
  event.preventDefault()
  event.stopPropagation()
 }
})