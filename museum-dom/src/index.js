//import image from './images/lazy.png';
import './scss/style.scss'
import './js/video.js';
import './js/menu.js';
import './js/script.js';
import './js/player.js';
import './js/swiper.js';
//import Swiper from './js/swiper-bundle.min.js';
//import playVideo from './js/player.js';
//import galleryFn from  './js/gallery.js';
import loadImages from './js/gallery.js';
import initComparisons from './js/explore.js';


import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
 // import 'swiper/css/navigation';
 // import 'swiper/css/pagination';

  // configure Swiper to use modules
  Swiper.use([Navigation, Pagination]);
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
const mainSlider = new Swiper('.swiper', {
  // Optional parameters
    
  
  
  // If we need pagination
  pagination: {
    el: '.main-slider__dots',
    //Буллеты
    
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.main-slider__arrow-next',
    prevEl: '.main-slider__arrow-prev', 
  /*  type: 'fraction',
    renderFraction: function(currentClass, totalClass) {
      return '<span class = "'+ currentClass + '"></span>' +
      '<span class = "'+ totalClass + '"></span>'
    } */
  },
simulateTouch: true,
//slideToClickedSlide: true,
 // autoHeight: true,
  slidesPerView:1,
 // watchOverflow: true,
  //spaceBetween: 30,
  loop: true, //бесконечный слайдер
 // slidesPerGroup:3,
  // And if we need scrollbar
 // freeMode: true, //свободный режим
 // Автопрокрутка 
 speed: 300,
 autoplay: {
   delay:1000,
   stopOnLastSlide: true,
   disableOnInteraction: false,
 },
 

});


const mainSliderCountSlides = document.querySelector('.main-slider__total');
const mainSliderCurrentSlides = document.querySelector('.main-slider__current');

mainSliderCountSlides.innerHTML = mainSlider.slides.length - 2;
console.log(mainSlider.slides.length);
mainSlider.on('slideChange', function() {
    let currentSlide = ++mainSlider.realIndex;
   
    mainSliderCurrentSlides.innerHTML = currentSlide;
});

const videoMiniSlider = new Swiper('.video-slider', {
  // Optional parameters
    
  
  
  // If we need pagination
  pagination: {
    el: '.control__dots',
    //Буллеты
    
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.video-slider .control__arrow-next',
    prevEl: '.video-slider .control__arrow-prev', 
  /*  type: 'fraction',
    renderFraction: function(currentClass, totalClass) {
      return '<span class = "'+ currentClass + '"></span>' +
      '<span class = "'+ totalClass + '"></span>'
    } */
  },
simulateTouch: true,
//slideToClickedSlide: true,
 // autoHeight: true,
  slidesPerView:3,
  watchOverflow: true,
  spaceBetween: 42,
  loop: true, //бесконечный слайдер
 // slidesPerGroup:3,
  // And if we need scrollbar
 // freeMode: true, //свободный режим
 // Автопрокрутка 
 freeMode: true,
 loopedSlides: 5, //looped slides should be the same
 watchSlidesProgress: true,
 speed: 300,
 autoplay: {
   delay:1000,
   stopOnLastSlide: true,
   disableOnInteraction: false,
 },
 

});

const videoSlider = new Swiper('.video-test', {
  // Optional parameters
    
  
  
  // If we need pagination
  

  // Navigation arrows
  
simulateTouch: true,
//slideToClickedSlide: true,
 // autoHeight: true,
  slidesPerView:1,
  watchOverflow: true,
  //spaceBetween: 30,
  loop: true, //бесконечный слайдер
 // slidesPerGroup:3,
  // And if we need scrollbar
 // freeMode: true, //свободный режим
 // Автопрокрутка 
 loopedSlides: 5, //looped slides should be the same
 speed: 300,
 thumbs: {
  swiper: {
   videoMiniSlider,
    
  }
 },
 

});


var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  loop: true,
  loopedSlides: 5, //looped slides should be the same
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});



//window.onload = loadImages;
window.onload = function() {
  loadImages();
  initComparisons();
}
//window.onload = initComparisons;