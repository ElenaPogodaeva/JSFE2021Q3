export default function changeBg() {
  const body = document.querySelector("body");
  const slideNext = document.querySelector(".slide-next");
  const slidePrev = document.querySelector(".slide-prev");
  let randomNum;

  function getRandomNum() {
    // return Math.random()*20 + 1;
    randomNum = Math.floor(Math.random() * 20) + 1;
  }
  getRandomNum();
  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const timesOfDay = ["night", "morning", "afternoon", "evening"];
    return timesOfDay[Math.floor(hours / 6)];
  }
  function setBg() {
    const timeOfDay = getTimeOfDay();
    //const num = getRandomNum().toString();
    const bgNum = randomNum.toString().padStart(2, "0");
    // const bgNum = '15'.padStart(2, '0');

    const img = new Image();
    // const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

    img.src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

    //const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };

    console.log(randomNum);
    console.log(img.src);
  }

  function getSlideNext() {
    if (randomNum < 20) {
      randomNum++;
    } else {
      randomNum = 1;
    }
    setBg();
  }

  function getSlidePrev() {
    if (randomNum > 1) {
      randomNum--;
    } else {
      randomNum = 20;
    }
    setBg();
  }
  window.addEventListener("load", setBg);
  slideNext.addEventListener("click", getSlideNext);
  slidePrev.addEventListener("click", getSlidePrev);
  //setBg();
}
