//import image from './images/lazy.png';
import './scss/style.scss'
import './js/video.js';
import './js/menu.js';
import './js/script.js';

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
window.onload = loadImages;