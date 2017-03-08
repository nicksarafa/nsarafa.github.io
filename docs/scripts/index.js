'use strict';

// scripts here

window.onload = function () {
  var isMenuOpen = false;
  var body = document.getElementById('body');
  var menuToggle = document.getElementById('menuToggle');
  var hiddenMenu = document.getElementById('hiddenMenu');

  menuToggle.onclick = function (event) {
    event.preventDefault(event);

    if (!isMenuOpen) {
      hiddenMenu.style.opacity = '100%';
      body.style.marginRight = '85%';
      isMenuOpen = true;
    } else if (isMenuOpen) {
      hiddenMenu.style.opacity = '0%';
      body.style.marginRight = '0%';
      isMenuOpen = false;
    }
  };
};