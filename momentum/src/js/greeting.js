export default function showDateTime() {
  const time = document.querySelector(".time");
  const dateText = document.querySelector(".date");
  const greeting = document.querySelector(".greeting");
  

  const greetingTranslation = [
    {
      "en": "Good night",
      "ru": "Доброй ночи",
    },
    {
     "en": "Good morning",
      "ru": "Доброе утро",
    },
    {
      "en": "Good afternoon",
      "ru": "Добрый день",
    },
    {
      "en": "Good evening",
      "ru": "Добрый вечер",
    },
  ];

  //const date = new Date();
  //const hours = date.getHours();

  function showTime(lang = "en") {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate(lang);
    showGreeting(lang);
    setTimeout(showTime, 1000);
  }

  function showDate(lang = "ru") {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    
    const currentDate = date.toLocaleDateString(lang, options);
    dateText.textContent = currentDate;
  }

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const timesOfDay = ["night", "morning", "afternoon", "evening"];
    return timesOfDay[Math.floor(hours / 6)];
  }

  function showGreeting(lang = "ru") {
   // const timeOfDay = getTimeOfDay();
   const date = new Date();
   const hours = date.getHours();
   const index = Math.floor(hours / 6);
   
   const greetingText = greetingTranslation[index][lang];
   // const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
  }

  showTime();





  function setLocalStorage() {
    const name = document.querySelector(".name");
    localStorage.setItem("name", name.value);
  }

  window.addEventListener("beforeunload", setLocalStorage);

  function getLocalStorage() {
    const name = document.querySelector(".name");
    if (localStorage.getItem("name")) {
      name.value = localStorage.getItem("name");
    }
  }

  window.addEventListener("load", getLocalStorage);
}
