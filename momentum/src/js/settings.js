const settingsIcon = document.querySelector(".settings-icon");
const settings = document.querySelector(".settings");
const time = document.querySelector(".time");
const dateText = document.querySelector(".date");
const greeting = document.querySelector(".greeting-container");
const player = document.querySelector(".player");
const weather = document.querySelector(".weather");
const quoteBtn = document.querySelector(".change-quote");

const quote = document.querySelector(".quote-block");

const showTime = document.querySelector('input[id="show-time"]');
const showDate = document.querySelector('input[id="show-date"]');
const showGreeting = document.querySelector('input[id="show-greeting"]');
const showPlayer = document.querySelector('input[id="show-audioplayer"]');
const showWeather = document.querySelector('input[id="show-weather"]');
const showQuotes = document.querySelector('input[id="show-quotes"]');

const checkedBoxes = document.querySelectorAll('input[type="checkbox"]');



const inputTags = document.querySelector(".settings-input");
const langInput  = document.querySelectorAll('input[name=lang]');

const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
  }

  const settingsTranslation = [
    {
      "settings-title-photo": "Photo",
      "settings-text-tag": "Tags",
      "settings-title-lang":"Language",
      "settings-title-show": "Show",
      "label-container-time": "Time",
      "label-container-date": "Date",
      "label-container-quote": "Quotes",
      "label-container-greeting":"Greeting",
      "label-container-player": "Audioplayer",
      "label-container-weather":"Weather"
    },
    {
     "settings-title-photo": "Источник фото",
     "settings-text-tag": "Теги",
     "settings-title-lang": "Язык",
     "settings-title-show": "Отображать",
     "label-container-time": "Время",
     "label-container-date": "Дата",
     "label-container-quote": "Цитата",
     "label-container-greeting":"Приветствие",
     "label-container-player": "Аудио",
     "label-container-weather":"Погода"
    },
  ];

  
function toogleSettings() {
  settings.classList.toggle("settings-active");
}



settingsIcon.addEventListener("click", toogleSettings);



showTime.addEventListener("change", () => {
    if(!showTime.checked) {
        time.classList.add("hidden");
      } else {
        time.classList.remove("hidden");
      }
});
showDate.addEventListener("change", () => {
    if(!showDate.checked) {
        dateText.classList.add("hidden");
      } else {
        dateText.classList.remove("hidden");
      }
});

showGreeting.addEventListener("change", () => {
    if(!showGreeting.checked) {
        greeting.classList.add("hidden");
      } else {
        greeting.classList.remove("hidden");
      }
});

showPlayer.addEventListener("change", () => {
    if(!showPlayer.checked) {
        player.classList.add("hidden");
      } else {
        player.classList.remove("hidden");
      }
});

showWeather.addEventListener("change", () => {
    if(!showWeather.checked) {
        weather.classList.add("hidden");
      } else {
        weather.classList.remove("hidden");
      }
});

showQuotes.addEventListener("change", () => {
    if(!showQuotes.checked) {
        quoteBtn.classList.add("hidden");
        quote.classList.add("hidden");
      } else {
        quoteBtn.classList.remove("hidden");
        quote.classList.remove("hidden");
      }
});

function setLocalStorage() {
  const photoSrc  = document.querySelector('input[name="photo-source"]:checked');
  localStorage.setItem("photo-source", photoSrc.value);
  
  const langInput  = document.querySelector('input[name="lang"]:checked');
  localStorage.setItem("lang", langInput.value);
  localStorage.setItem("tags", inputTags.value);
  const checkBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

  const status = checkBoxes.reduce(
    (map, checkbox) => Object.assign({}, map, { [checkbox.value]: checkbox.checked }),
    {}
  )
  localStorage.setItem("chx", JSON.stringify(status));

/*  localStorage.setItem("show-time", showTime.checked);
  localStorage.setItem("show-date", showDate.checked);
  localStorage.setItem("show-greeting", showGreeting.checked);
  localStorage.setItem("show-player", showPlayer.checked);
  localStorage.setItem("show-weather", showWeather.checked);
  localStorage.setItem("show-quotes", showQuotes.checked);*/
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  
  if (localStorage.getItem("photo-source")) {
    const source =  localStorage.getItem("photo-source");
    const photo  = document.querySelector(`input[name=photo-source][value="${source}"]`);
    photo.checked = true;
  }
  if (localStorage.getItem("lang")) {
    const lang =  localStorage.getItem("lang");
    const language  = document.querySelector(`input[name=lang][value="${lang}"]`);
    language.checked = true;
  }
  if (localStorage.getItem("tags")) {
    inputTags.value = localStorage.getItem("tags");
  }
/*  if (localStorage.getItem("show-time")) {
    const checked = JSON.parse(localStorage.getItem("show-time"));
    showTime.checked = checked
    //console.log(time.checked);
   // time.checked;
  }*/
 // setChx();
  if (localStorage.getItem("chx")) {
    const values = JSON.parse(localStorage.getItem("chx")) || {};
   
    Object.entries(values).forEach(
      ([value, isChecked]) => {
        // ...sets the check status
      //  document.querySelector(`[value="${value }"]`).checked = isChecked;
        if (isChecked) {
          document.querySelector(`[value="${value }"]`).checked = true;
          document.querySelector(`.${ value }`).classList.remove("hidden");
         // console.log(document.querySelector(`.${ name }`))
        }
        else {
          document.querySelector(`[value="${value }"]`).checked = false;
          document.querySelector(`.${ value }`).classList.add("hidden");
        }
        
      }
    )
  }
}



function setLang() {
  
  const langChecked = document.querySelector('input[name=lang]:checked');
  const lang = langChecked.value;
  if (lang === 'en') {
    for (let key in settingsTranslation[0]) {
      document.querySelector(`[id ="${key}"]`).textContent =  settingsTranslation[0][key];
    }
  }
  else if (lang === 'ru') { 
    for (let key in settingsTranslation[1]) {
      document.querySelector(`[id ="${key}"]`).textContent =  settingsTranslation[1][key];
    
    }
  }
    
  
}

langInput.forEach(el => el.addEventListener('click', setLang));
window.addEventListener("load", getLocalStorage);