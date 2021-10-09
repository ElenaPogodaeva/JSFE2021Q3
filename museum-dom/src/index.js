//import image from './images/lazy.png';
import './scss/style.scss'
import './js/video.js';
import './js/menu.js';
import './js/script.js';
import './js/player.js';

import Swiper from './js/swiper-bundle.min.js';
//import playVideo from './js/player.js';
//import galleryFn from  './js/gallery.js';
import loadImages from './js/gallery.js';
/*
const createImage = (src) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render(); */
const swiper = new Swiper('.swiper', {
  // Optional parameters
 // direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
window.onload = loadImages;
//window.onload = playVideo;