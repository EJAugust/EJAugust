inherit.container
inherit.releaseDate
inherit.niceName
inherit.released
inherit.description

const releaseDate = new Date(part.releaseDate)
part.popup = element(part.container, "dialog")
part.popup.tabIndex = 0
part.popup.innerHTML = `
 <img src="https://${part.parent.host}/${Framework.version}/still.png" alt="Still image captured from ${part.niceName}">
 <h3>${part.niceName}</h3>
 <p id=release-date>${releaseDate > Date.now() ? "Coming" : "Released on"} ${releaseDate.toLocaleDateString("en-US", {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
})}</p>
 <p><a id=play-btn class="cta ${part.released ? "released" : "upcoming"}">${part.released ? "Watch Now" : "Coming soon"}</a>
 <p>${part.description}`

// part.backButton = part.popup.querySelector("#back-btn")
// part.backButton.onclick = async () => {
//  await part.parent.parent.setLayer(LAYER, 0n)
// }
part.onclickBackup = app.homeButton.onclick
app.homeButton.onclick = () => part.parent.parent.setLayer(LAYER, 0n)
part.homeIconBackup = app.homeIcon
app.homeIcon.remove()
part.homeLabelBackup = app.homeLabel.textContent
app.homeLabel.innerHTML = "❮&nbsp;&nbsp;Library"

part.playButton = part.popup.querySelector("#play-btn")
part.playButton.onclick = async () => { /*
 if (document.documentElement.requestFullscreen)
  await document.documentElement.requestFullscreen()
 else if (document.documentElement.webkitRequestFullscreen)
  await document.documentElement.webkitRequestFullscreen()
 else if (document.documentElement.msRequestFullscreen)
  await document.documentElement.msRequestFullscreen()*/
 await part.parent.setLayer(LAYER, 1n)
}

part.popup.focus()