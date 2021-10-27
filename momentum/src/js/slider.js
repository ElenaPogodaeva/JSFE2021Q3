export default function changeBg() {
  const body = document.querySelector("body");
  const slideNext = document.querySelector(".slide-next");
  const slidePrev = document.querySelector(".slide-prev");


  const photoSrc  = document.querySelectorAll('input[name=photo-source]');
  let photo = "GitHub";

  const inputTags = document.querySelector(".settings-input");
  let tags = ''; 

let photoArray = [];
let photoNum = 0;

  let randomNum;

  function getRandomNum(min, max) {
    // return Math.random()*20 + 1;
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomNum(1, 20);

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
   
    const bgNum = randomNum.toString().padStart(2, "0");
  
   
    const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    setBg(src);
    
   
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


  async function getImgFromUnsplash(tags) {
    if (tags === '') {
      tags = getTimeOfDay();
      
    }
   // const timeOfDay = getTimeOfDay();
    const url = `https://api.unsplash.com/photos/random?query=${tags}&client_id=oVE-N1MJGgo0-9JrJ21Qdv0m__vGtwbV0OvlfUutJMg`;
    const res = await fetch(url); //${timeOfDay}
    const data = await res.json();


    // const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

    const src = data.urls.regular;
    //const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    setBg(src);

   // body.style.backgroundImage = `url(${data.urls.regular})`;
}

async function getImgFromFlickr(tag) {
  let url;
  if (tag === '') {
    tag = getTimeOfDay();
    let id;
    switch (tag) {
      case "night":
        id = "72157720062587146";
        break;
      case "morning":
        id = "72157720069530982";
        break;
      case "afternoon":
        id = "72157720111881805"; 
        break;
      case "evening":
        id = "72157720111880160";
       break;
    }
    url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=76f2ad1b1c2bc03737c9a268bb694c82&gallery_id=${id}&extras=url_h&format=json&nojsoncallback=1`;
 
  }
  else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=76f2ad1b1c2bc03737c9a268bb694c82&tags=${tag}&extras=url_h&format=json&nojsoncallback=1`;
  
  }
 // const timeOfDay = getTimeOfDay();
 // const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=76f2ad1b1c2bc03737c9a268bb694c82&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
 //const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=0f15ff623f1198a1f7f52550f8c36057&gallery_id=72157717349231213&extras=url_h&format=json&nojsoncallback=1`;
 
 const res = await fetch(url); //${timeOfDay}
  const data = await res.json();

  return data.photos.photo.filter(item => item.url_h);

//console.log(arr);
  // const src = `https://raw.githubusercontent.com/ElenaPogodaeva/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

}

async function setImgFromFlickr() {
 
  ///  photoArray = getImgFromFlickr(tags);
  if (photoArray.length === 0) {
    photoArray = await getImgFromFlickr(tags);
  }

  const index = Math.floor(Math.random() *  photoArray.length);
 // const index = getRandomNum(0, photoArray.length - 1);
  
    setBg(photoArray[index].url_h);
   
  
 // else {
 //   setBg(photoArray[1].url_h);
 // }
 // photoArray = await getImgFromFlickr(tags);
  
 // setBg(photoArray[0].url_h);
}


function showNextSlide() {
  if (photo === 'GitHub') {
    getSlideNext();
  }
  else if (photo === 'Unsplash API') {
    getImgFromUnsplash(tags);
  }
  else if (photo === 'Flickr API') {
    setImgFromFlickr();
  }
}




function showPrevSlide() {
  if (photo === 'GitHub') {
    getSlidePrev();
  }
  else if (photo === 'Unsplash API') {
    getImgFromUnsplash(tags);
  }
  else if (photo === 'Flickr API') {
    setImgFromFlickr();
  }
}

function setSrcValue() {
  const photoSrcChecked = document.querySelector('input[name=photo-source]:checked');
   photo = photoSrcChecked.value;
  
}



  window.addEventListener("load", getGutHubLink);

  photoSrc.forEach(el => el.addEventListener('click', setSrcValue));


  inputTags.addEventListener("change", () => {
    tags = inputTags.value;
    photoArray = [];
  });

  slideNext.addEventListener("click", showNextSlide);
  slidePrev.addEventListener("click", showPrevSlide);
  
}
