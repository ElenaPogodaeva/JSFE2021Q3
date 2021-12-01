export { settings, playAudio };
import { mainScreen } from "./mainPage";

const settings = document.querySelector(".settings");
const volumeScale = document.querySelector(".volume-progress");
const muteButton = document.querySelector(".volume__icon");
const audioItems = Array.from(document.querySelectorAll("audio"));
const audio = audioItems[0];

function playAudio(volume) {
  const audio = document.querySelector(`audio[data-volume="${volume}"]`);
  audio.currentTime = 0;
  audio.play();
}

function changeVolume() {
  const volume = volumeScale.value;
  audioItems.forEach((item) => {
    item.volume = volume;
    if (item.volume === 0) {
      item.muted = true;
    } else {
      item.muted = false;
    }
    handleRangeUpdate();
  });
}

function handleRangeUpdate() {
  const value = volumeScale.value;
  volumeScale.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
    value * 100
  }%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`;
}

function toggleMuteBtn() {
  if (audio.muted || audio.volume === 0) {
    muteButton.classList.add("mute");
  } else {
    muteButton.classList.remove("mute");
  }
}

function toggleMute() {
  audioItems.forEach((item) => {
    if (!item.muted) {
      item.muted = true;
      volumeScale.value = 0;
      handleRangeUpdate();
    } else {
      item.muted = false;
      volumeScale.value = 0.5;
      item.volume = volumeScale.value;
      handleRangeUpdate();
    }
  });
}

volumeScale.addEventListener("input", changeVolume);
audio.addEventListener("volumechange", toggleMuteBtn);
muteButton.addEventListener("click", toggleMute);

const buttonHome = document.querySelector(".settings__button");

buttonHome.addEventListener("click", () => {
  settings.classList.add("hide");
  mainScreen.classList.remove("hide");
});
