//import image from './images/lazy.png';
//import './js/time.js';
import './js/settings';
//import './assets/sounds/';
import showDateTime from './js/greeting.js';
import changeBg from './js/slider.js';
import showWeather from './js/weather.js';
import showQuotes from './js/quotes.js';

import audioPlay from'./js/audioplayer.js';
//import playList from "./js/playList.js";
/*const createImage = (src) => new Promise((res, rej) => {
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
showDateTime();
changeBg();
showWeather();
showQuotes();
audioPlay();