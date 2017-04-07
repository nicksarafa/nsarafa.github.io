'use strict';

// scripts

window.onload = function () {
  var isMenuOpen = false;
  var menuToggle = document.getElementById('menu-toggle');
  var hiddenMenu = document.getElementById('hidden-menu');

  menuToggle.onclick = function (event) {
    event.preventDefault(event);

    if (!isMenuOpen) {
      hiddenMenu.style.opacity = '100';
      isMenuOpen = true;
    } else if (isMenuOpen) {
      hiddenMenu.style.opacity = '0';
      isMenuOpen = false;
    }
  };
};