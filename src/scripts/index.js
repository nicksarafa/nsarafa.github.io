// scripts

window.onload = function () {
  let isMenuOpen = false
  const menuToggle = document.getElementById('menu-toggle')
  const hiddenMenu = document.getElementById('hidden-menu')

  menuToggle.onclick = function(event) {
    event.preventDefault(event)

    if(!isMenuOpen) {
      hiddenMenu.style.opacity = '1'
      isMenuOpen = true
    } else if (isMenuOpen) {
      hiddenMenu.style.opacity = '0'
      isMenuOpen = false
    }
  }
}