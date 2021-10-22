
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

 function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const timesOfDay = ["night", "morning", "afternoon", "evening"];
    return timesOfDay[Math.floor(hours / 6)];
  }

async function getLinkToImage() {
    const timeOfDay = getTimeOfDay();
    const url = `https://api.unsplash.com/photos/random?query=nature morning&client_id=oVE-N1MJGgo0-9JrJ21Qdv0m__vGtwbV0OvlfUutJMg`;
    const res = await fetch(url); //${timeOfDay}
    const data = await res.json();
    body.style.backgroundImage = `url(${data.urls.regular})`;
    console.log(data.urls.regular);
}
//getLinkToImage();

//slideNext.addEventListener("click", getLinkToImage);
//slidePrev.addEventListener("click", getLinkToImage);