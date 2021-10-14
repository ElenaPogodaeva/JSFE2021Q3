import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  
  
  // configure Swiper to use modules
  Swiper.use([Navigation, Pagination]);

export default function playVideo() {

  
  const player = document.querySelector('.video');
  const video = player.querySelector('.viewer');
  const toogle = player.querySelector('.play');
  const playButton = player.querySelector('.video__play');
  const ranges = player.querySelectorAll('.progress');
  const progressBar = player.querySelector('.video-progress');
  const volumeScale = player.querySelector('.volume-progress');
  const mute = player.querySelector('.volume');
  const fullscreen = player.querySelector('.fullscreen');
  const videoContainer = player.querySelector('.video__wrapper');
  const iframes = document.querySelectorAll('.swiper-slide iframe');


  function tooglePlay() {
    const method = video.paused ? 'play' : 'pause';
  /*  if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    } */
    video[method]();
}
function updateButton() {
    const urlPlay = './assets/svg/video/1.svg';
    const urlPause = './assets/svg/video/pause.svg';
    const url = this.paused ? urlPlay : urlPause;
    const display = this.paused ? 'block' : 'none';
    toogle.style.backgroundImage = `url( ${url})`;
    playButton.style.display = display;
    // toogle.background = url;
   // console.log(url);
}


function updateMuteButton() {
    const urlMute = './assets/svg/video/mute.svg';
    const urlUnmute = './assets/svg/video/2.svg';
    const url = video.muted || video.volume === 0 ? urlMute : urlUnmute;
    mute.style.backgroundImage = `url( ${url})`;

}

function updateFullscreenButton() {
    const urlFullscreen = './assets/svg/video/3.svg';
    const urlExitFullscreen = './assets/svg/video/fullscreen_exit.svg';
    const url = document.fullscreenElement ? urlExitFullscreen  : urlFullscreen;
    fullscreen.style.backgroundImage = `url( ${url})`;
    
}

function handleRangeUpdate() {
   // video[this.name] = this.value;
    const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  //  console.log(this.value);
  //  console.log(this.name);
}

function handleProgress() {
  const percent = (Math.floor(video.currentTime) / Math.floor(video.duration)) * 100;
  
  progressBar.value = percent; 
    progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`;
}
function scrub(e) {
   const scrubTime = (this.value / 100)* video.duration;
   video.currentTime = scrubTime;
}

function changeVolume() {
    const volume = volumeScale.value / 100;
    video.volume = volume;
    if (video.muted) {
        video.muted = false;
       // mute.style.backgroundImage = `url(../assets/svg/video/pause.svg)`;
    }
   // updateMuteButton();
 /*   else {
        mute.style.backgroundImage = `url(../assets/svg/video/2.svg)`;
    }*/
}
function toogleMute() {
 if (!video.muted) {
    video.muted = true;
 }
 else {
  video.muted = false;
 }
   // video.muted = !video.muted;
  /*  if (video.muted) {
        volumeScale.value = 0;
    }
    else volumeScale.value = video.volume;*/
}
function toogleFullScreen() {
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
      } //else if (document.webkitFullscreenElement) {
        // Need this to support Safari
     //   document.webkitExitFullscreen();
     // } else if (player.webkitRequestFullscreen) {
        // Need this to support Safari
     //   player.webkitRequestFullscreen();
     // }
      else {
        player.requestFullscreen();
      }
     
}


const videoSlider = new Swiper('.video-slider', {
  // Optional parameters
    
  
  
  // If we need pagination
  pagination: {
      el: '.video-slider .control__dots',
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
 // watchOverflow: true,
  spaceBetween: 42,
  loop: true, //бесконечный слайдер
 // slidesPerGroup:3,
  // And if we need scrollbar
 // freeMode: true, //свободный режим
 // Автопрокрутка 
// freeMode: true,

 speed: 300,
/* autoplay: {
   delay:1000,
   stopOnLastSlide: true,
   disableOnInteraction: false,
 },*/
 

});

function changeVideo() {
 // progressBar.value = 0;
 
    video.src = `assets/video/video${videoSlider.realIndex}.mp4`;
   
    video.poster = `assets/img/video-section/poster${videoSlider.realIndex}.jpg`;
    video.load();

    progressBar.style.background = `linear-gradient(to right, #c4c4c4 0%, #c4c4c4 100%)`;
 
  playButton.style.display = 'block';
  
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

  });
//iframes[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
   // progressBar.value = 0;
   
}


video.addEventListener('click', tooglePlay);
playButton.addEventListener('click', tooglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('volumechange', updateMuteButton);
document.addEventListener('fullscreenchange', updateFullscreenButton);
toogle.addEventListener('click', tooglePlay);
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
   // e.preventDefault();
    tooglePlay();

  }
  else if (e.code === 'KeyM') {
    toogleMute();
  }
  
  else if (e.code === 'KeyF'){
    toogleFullScreen();
  }
  else if ((e.code === 'Comma')&&(e.shiftKey)) {
    if (video.playbackRate === 2) {
      video.playbackRate = 2;
    }
    else {
      video.playbackRate = video.playbackRate + 0.25;
    }
  }
  else if ((e.code === 'Period')&&(e.shiftKey)) {
    if (video.playbackRate === 0.5) {
      video.playbackRate = 0.5;
    }
    else {
      video.playbackRate = video.playbackRate - 0.25;
    }
  }
});



ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progressBar.addEventListener('input',scrub);

mute.addEventListener('click', toogleMute);
volumeScale.addEventListener('input', changeVolume);

fullscreen.addEventListener('click', toogleFullScreen);


videoSlider.on('slideChange', changeVideo);


}