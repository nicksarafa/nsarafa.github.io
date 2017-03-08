// scripts here

window.onload = function () {
  let isMenuOpen = false
  const body = document.getElementById('body')
  const menuToggle = document.getElementById('menuToggle')
  const hiddenMenu = document.getElementById('hiddenMenu')

  menuToggle.onclick = function(event) {
    event.preventDefault(event)

    if(!isMenuOpen) {
      hiddenMenu.style.opacity = '100%'
      body.style.marginRight = '85%'
      isMenuOpen = true
    } else if (isMenuOpen) {
      hiddenMenu.style.opacity = '0%'
      body.style.marginRight = '0%'
      isMenuOpen = false
    }
  }
}