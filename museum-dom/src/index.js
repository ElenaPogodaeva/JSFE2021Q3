//import image from './images/lazy.png';
import './scss/style.scss'
import './js/video.js';
import './js/menu.js';
import './js/script.js';
//import './js/player.js';
//import './js/swiper.js';
//import './js/scroll.js';
//import Swiper from './js/swiper-bundle.min.js';
//import playVideo from './js/player.js';
//import galleryFn from  './js/gallery.js';
import loadImages from './js/gallery.js';
import playVideo from './js/player.js';
import initComparisons from './js/explore.js';
import animOnScroll from './js/scroll.js';
import calcPrice from './js/tickets.js';
import formValidation from './js/form.js';



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
mainSlider.on('slideChange', function() {
    let currentSlide = ++mainSlider.realIndex;
   
    mainSliderCurrentSlides.innerHTML = currentSlide;
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbmFwb2dvZGFldmEiLCJhIjoiY2t1b2Nrazk0Mjl6NDJxbjZ5dnQxNXN0NiJ9.dLhBNeoljyMUjwMl47Pj4A';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [2.3364, 48.86091],
zoom: 16
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color: '#868080'})
.setLngLat([2.3333, 48.8602])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({color: '#868080'})
.setLngLat([2.3397, 48.8607])
.addTo(map);

const marker3 = new mapboxgl.Marker({color: '#868080'})
.setLngLat([2.3330, 48.8619])
.addTo(map);

const marker4 = new mapboxgl.Marker({color: '#868080'})
.setLngLat([2.3365, 48.8625])
.addTo(map);

const marker5 = new mapboxgl.Marker({color: '#000000'})
.setLngLat([2.3364, 48.86091])
.addTo(map);

//window.onload = loadImages;
window.onload = function() {
  loadImages();
  initComparisons();
  
}
playVideo();
animOnScroll();
calcPrice();
formValidation();
//window.onload = initComparisons;