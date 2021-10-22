import playList from "./playList";

export default function audioPlay() {
  const audio = new Audio();
  const button = document.querySelector(".play");
  const buttonNext = document.querySelector(".play-next");
  const buttonPrev = document.querySelector(".play-prev");
  const playListContainer = document.querySelector(".play-list");
  const progressBar = document.querySelector(".progress");

  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListContainer.append(li);
  });

  let playNum = 0;
  let isPlay = false;
  const playItems = Array.from(document.querySelectorAll(".play-item"));

  function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    button.classList.add("pause");
    showActiveItem();
  }
  function playAudio1() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    //  toggleBtn();
    if (!isPlay) {
      audio.play();
      isPlay = true;
    } else {
      audio.pause();
      isPlay = false;
      // progressBar.value = audio.currentTime;
    }
    toggleBtn();
    console.log(playNum);
    showActiveItem();
  }

  function toggleBtn() {
    if (isPlay) {
      button.classList.add("pause");
    } else {
      button.classList.remove("pause");
    }
  }

  function showActiveItem() {
    playItems.forEach((el) => {
      if (el.classList.contains("item-active")) {
        el.classList.remove("item-active");
      }
    });
    playItems[playNum].classList.add("item-active");
  }

  function playNext() {
    if (playNum < playList.length - 1) {
      playNum++;
    } else {
      playNum = 0;
    }
    console.log(playNum);
    playAudio();
  }
  function playPrev() {
    if (playNum > 0) {
      playNum--;
    } else {
      playNum = playList.length - 1;
    }
    console.log(playNum);
    playAudio();
  }

  button.addEventListener("click", playAudio1);

  buttonNext.addEventListener("click", playNext);
  buttonPrev.addEventListener("click", playPrev);
}
