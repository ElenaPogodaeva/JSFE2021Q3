export default function changeBg() {
  const body = document.querySelector("body");
  const slideNext = document.querySelector(".slide-next");
  const slidePrev = document.querySelector(".slide-prev");


  const photoSrc  = document.querySelectorAll('input[name=photo-source]');
  let photo = "GitHub";

  const inputTags = document.querySelector(".settings-input");
  let tags = ''; 


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


  function setBg(src) {
    const img = new Image();
    img.src = src;
    //const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  }

  function getGutHubLink() {
    const timeOfDay = getTimeOfDay();
    //const num = getRandomNum().toString();
    const bgNum = randomNum.toString().padStart(2, "0");
    // const bgNum = '15'.padStart(2, '0');

   // const img = new Image();
    // const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

    const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    setBg(src);
    //const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
   // img.onload = () => {
   //   body.style.backgroundImage = `url(${img.src})`;
   // };

    console.log(randomNum);
   // console.log(img.src);
  }


  

  



  function getSlideNext() {
    if (randomNum < 20) {
      randomNum++;
    } else {
      randomNum = 1;
    }
    getGutHubLink();
  }

  function getSlidePrev() {
    if (randomNum > 1) {
      randomNum--;
    } else {
      randomNum = 20;
    }
    getGutHubLink();
  }


  async function getLinkToImage(tags) {
    if (tags === '') {
      tags = getTimeOfDay();
      
    }
   // const timeOfDay = getTimeOfDay();
    const url = `https://api.unsplash.com/photos/random?query=${tags}&client_id=oVE-N1MJGgo0-9JrJ21Qdv0m__vGtwbV0OvlfUutJMg`;
    const res = await fetch(url); //${timeOfDay}
    const data = await res.json();

console.log(url);
console.log(tag);
    // const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

    const src = data.urls.regular;
    //const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    setBg(src);

   // body.style.backgroundImage = `url(${data.urls.regular})`;
    console.log(data.urls.regular);
}

function showNextSlide() {
  if (photo === 'GitHub') {
    getSlideNext();
  }
  else if (photo === 'Unsplash API') {
    getLinkToImage(tags);
  }
}
function showPrevSlide() {
  if (photo === 'GitHub') {
    getSlidePrev();
  }
  else if (photo === 'Unsplash API') {
    getLinkToImage(tags);
  }
}

function setSrcValue() {
  const photoSrcChecked = document.querySelector('input[name=photo-source]:checked');
   photo = photoSrcChecked.value;  
   console.log(photo);
   
}


  window.addEventListener("load", getGutHubLink);

  photoSrc.forEach(el => el.addEventListener('click', setSrcValue));


  inputTags.addEventListener("change", () => {
    tags = inputTags.value;
    console.log(tags);
  });

  slideNext.addEventListener("click", showNextSlide);
  slidePrev.addEventListener("click", showPrevSlide);
  
}
