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