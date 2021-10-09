

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
    const urlPlay = '../assets/svg/video/1.svg';
    const urlPause = '../assets/svg/video/pause.svg';
    const url = this.paused ? urlPlay : urlPause;
    const display = this.paused ? 'block' : 'none';
    toogle.style.backgroundImage = `url( ${url})`;
    playButton.style.display = display;
    // toogle.background = url;
   // console.log(url);
}


function updateMuteButton() {
    const urlMute = '../assets/svg/video/mute.svg';
    const urlUnmute = '../assets/svg/video/2.svg';
    const url = video.muted || video.volume === 0 ? urlMute : urlUnmute;
    mute.style.backgroundImage = `url( ${url})`;

}

function updateFullscreenButton() {
    const urlFullscreen = '../assets/svg/video/3.svg';
    const urlExitFullscreen = '../assets/svg/video/fullscreen_exit.svg';
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
   console.log(percent);
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
  //  updateMuteButton();
    video.muted = !video.muted;
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
     // updateFullscreenButton();
}



video.addEventListener('click', tooglePlay);
playButton.addEventListener('click', tooglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('volumechange', updateMuteButton);
document.addEventListener('fullscreenchange', updateFullscreenButton);
toogle.addEventListener('click', tooglePlay);

ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progressBar.addEventListener('input',scrub);

mute.addEventListener('click', toogleMute);
volumeScale.addEventListener('input', changeVolume);

fullscreen.addEventListener('click', toogleFullScreen);
//export default playVideo;
