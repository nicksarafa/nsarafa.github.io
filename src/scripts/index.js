// scripts here

window.onload = function () {
  let isMenuOpen = false
  const body = document.getElementById('body')
  const menuButton = document.getElementById('menuButton')

  menuButton.onclick = function(event) {
    event.preventDefault(event)

    if(!isMenuOpen) {
      body.style.paddingRight = '330px'
      isMenuOpen = true
    } else if (isMenuOpen) {
      body.style.paddingRight = '0px'
      isMenuOpen = false
    }
  }
}