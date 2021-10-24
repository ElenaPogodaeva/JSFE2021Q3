import playList from "./playList";

export default function audioPlay() {
  const audio = new Audio();
  const button = document.querySelector(".play");
  const buttonNext = document.querySelector(".play-next");
  const buttonPrev = document.querySelector(".play-prev");
  const muteButton = document.querySelector(".volume");
  const playListContainer = document.querySelector(".play-list");
  const progress = document.querySelector(".progress");
  const progressBar = document.querySelector(".progress-filled");
  const currTime = document.querySelector(".current-time");
  const durationTime = document.querySelector(".duration");
  const volumeScale = document.querySelector('.volume-progress');

  const playerTitle = document.querySelector('.player-title');


  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListContainer.append(li);
  });

  let playNum = 0;
  let isPlay = false;
  

  const playItems = document.querySelectorAll(".play-item");
  playerTitle.textContent = playList[0].title;
  currTime.textContent = '00:00';
  durationTime.textContent = playList[0].duration; 
  audio.src = playList[0].src;
  audio.currentTime = 0;


  function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    button.classList.add("pause");
    showActiveItem();
    
    durationTime.textContent = playList[playNum].duration; 
    playerTitle.textContent = playList[playNum].title;
  }
 /* function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
      audio.play();
      isPlay = true;
    } else {
      audio.pause();
      isPlay = false;
      // progressBar.value = audio.currentTime;
    }
    toggleBtn();
    //durationTime.textContent = playList[playNum].duration; 
   // playerTitle.textContent = playList[playNum].title;
  }*/
  function togglePlay() {
   // audio.src = playList[playNum].src;
   // audio.currentTime = 0;
  // audio.src = playList[playNum].src;
  // audio.currentTime = 0;
    if (!isPlay) {
      audio.play();
      isPlay = true;
    } else {
      audio.pause();
      isPlay = false;
      // progressBar.value = audio.currentTime;
    }
    toggleBtn();
   // console.log(playNum);
  //  showActiveItem();
    
  }

  function toggleBtn() {
    if (isPlay) {
      button.classList.add("pause");
      playItems[playNum].classList.add("item-active");
    } else {
      button.classList.remove("pause");
      playItems[playNum].classList.remove("item-active");
    }
  }/*
  function toggleMuteBtn() {
    if (isMute) {
      muteButton.classList.add("mute");
    } else {
      muteButton.classList.remove("mute");
    }
  }*/





  function showActiveItem() {
    playItems.forEach((el) => {
      if (el.classList.contains("item-active")) {
        el.classList.remove("item-active");
      }
    });
    playItems[playNum].classList.add("item-active");
  }

  playItems.forEach((el, index) => el.addEventListener("click", () => {
    playNum = index;
    playItems.forEach((el, i) => {
      if (el.classList.contains("item-active")&& (i !== index)) {
        el.classList.remove("item-active");
        audio.pause();
      }
    });
    
    audio.src = playList[playNum].src;
    audio.currentTime = 0;

    durationTime.textContent = playList[playNum].duration; 
    playerTitle.textContent = playList[playNum].title;

    if (el.classList.contains("item-active")) {
      isPlay = false;
     // el.classList.remove("item-active");
    //  button.classList.remove("pause");
      audio.pause();
    }
    else {
      isPlay = true;
    //  el.classList.add("item-active");
     // button.classList.add("pause");
      audio.play();
    }
    toggleBtn();
  }));

  function playNext() {
    if (playNum < playList.length - 1) {
      playNum++;
    } else {
      playNum = 0;
    }
  //  console.log(playNum);
    playAudio();
  }
  function playPrev() {
    if (playNum > 0) {
      playNum--;
    } else {
      playNum = playList.length - 1;
    }
  //  console.log(playNum);
    playAudio();
  }

  button.addEventListener("click", togglePlay);

  buttonNext.addEventListener("click", playNext);
  buttonPrev.addEventListener("click", playPrev);

  muteButton.addEventListener("click", toggleMute);

  function handleProgress() {
    const percent = (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100;
    
   // progressBar.value = percent; 
      progressBar.style.width = `${percent}%`;
      currTime.textContent = audioTime(audio.currentTime);
    //  console.log(audio.duration);
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
  }

  function audioTime(time) { //Рассчитываем время в секундах и минутах
    time = Math.floor(time);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var minutesVal = minutes;
    var secondsVal = seconds;
    if(minutes < 10) {
    minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
    secondsVal = '0' + seconds;
    }
    return minutesVal + ':' + secondsVal;
    }


  /*  function changeVolume() {
        const volume = volumeScale.value / 100;
        audio.volume = volume;
     //   if (audio.muted) {
       //     audio.muted = false;
           // mute.style.backgroundImage = `url(../assets/svg/video/pause.svg)`;
      //  }
      if (volume == 0) {
        isMute = true;
      }
      else {
        isMute = false;
      }
        handleRangeUpdate();
        toggleMuteBtn();
      
    } */



    function changeVolume() {
      const volume = volumeScale.value;
      audio.volume = volume;
      if (audio.volume === 0) {
        audio.muted = true;
      }
      else {
        audio.muted = false;
      }
     // if (audio.muted) {
     //    audio.muted = false;
         // mute.style.backgroundImage = `url(../assets/svg/video/pause.svg)`;
    //  }
      handleRangeUpdate();
     // updateMuteButton();
   /*   else {
          mute.style.backgroundImage = `url(../assets/svg/video/2.svg)`;
      }*/
  }
  
    function toggleMuteBtn() {
      if (audio.muted || audio.volume === 0) {
        muteButton.classList.add("mute");
      } else {
        muteButton.classList.remove("mute");
      }
    }
    /*
    function toggleMute() {
      if (!isMute) {
         audio.muted = true;
         isMute = true;
      }
      else {
         audio.muted = false;
         isMute = false;
      }
      toggleMuteBtn();
     }
  */
  
     function toggleMute() {
      if (!audio.muted) {
        audio.muted = true;
        volumeScale.value =0;
        handleRangeUpdate();
      }
      else {
        audio.muted = false;
        volumeScale.value = 0.5;
        audio.volume = volumeScale.value;
        handleRangeUpdate();
        console.log(audio.volume);
      }
  
        // video.muted = !video.muted;
       /*  if (video.muted) {
             volumeScale.value = 0;
         }
         else volumeScale.value = video.volume;*/
     }
  



    function handleRangeUpdate() {
      // video[this.name] = this.value;
       const value = volumeScale.value;
       volumeScale.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`;
       console.log(volumeScale.value);
     //  console.log(this.name);
   }

  let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

  audio.addEventListener('timeupdate', handleProgress);
 // progressBar.addEventListener('input', function() {
 //   const value = this.value;
 //   this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`
 // });
 volumeScale.addEventListener('input', changeVolume);


 audio.addEventListener('volumechange', toggleMuteBtn);

 audio.addEventListener("ended", playNext);

}

