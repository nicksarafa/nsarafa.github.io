'use strict';

// scripts here

window.onload = function () {
  var isMenuOpen = false;
  var body = document.getElementById('body');
  var menuButton = document.getElementById('menuButton');

  menuButton.onclick = function (event) {
    event.preventDefault(event);

    if (!isMenuOpen) {
      body.style.paddingRight = '330px';
      isMenuOpen = true;
    } else if (isMenuOpen) {
      body.style.paddingRight = '0px';
      isMenuOpen = false;
    }
  };
};