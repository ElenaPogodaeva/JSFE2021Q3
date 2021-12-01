export {
  questions,
  newQuestions,
  questionsAmount,
  correctAnswersAmount,
  quizType,
  mainScreen,
};
import { categoriesContainer, categories } from "./categories";
import { isPlayedAuthor, isPlayedPicture } from "./question";
import { settings } from "./settings";

const mainScreen = document.querySelector(".main-screen");
const artists = document.querySelector(".artists");
const pictures = document.querySelector(".pictures");

let questions;
let newQuestions;
let questionsAmount;
let correctAnswersAmount;
let quizType;

async function fetchData(url) {
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

function chunkArray(array, chunk) {
  let newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}

async function setQuestions() {
  try {
    quizType = this.id;
    const src = `./assets/data/data.json`;
    const data = await fetchData(src);

    if (quizType === "author") {
      questions = data.slice(0, 120);
    } else {
      questions = data.slice(120);
    }

    questionsAmount = 10;
    newQuestions = chunkArray(questions, 10);
    renderCategory(newQuestions);
    mainScreen.classList.add("hide");
    categories.classList.remove("hide");
  } catch (error) {
    alert(error);
  }
}

function renderCategory(questions) {
  let displayCategory = "";
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;
  const categoryNames = [
    "Portrait",
    "Landscape",
    "Still life",
    "Graphic",
    "Antique",
    "Avant-garde",
    "Renaissance",
    "Surrealism",
    "Kitsch",
    "Minimalism",
    "Interior",
    "Industrial",
  ];
  questions.map((item, index) => {
    const img = document.createElement("img");

    img.src = `${src}${item[0].imageNum}.jpg`;
  
    displayCategory += `<div class="categories__item category-item" id = "${index}">
     <div class="category-item__header">
       <div class="category-item__title">${categoryNames[index]}</div>
       <div class="category-item__total"></div>
     </div>
     <div class="category-item__img">
       <img src = ${img.src}>     
     </div>
     <button class="category-item__score" id = "${index}">Score</button>
   </div>`;

    //  categoriesContainer.appendChild(displayCategory);
  });

  categoriesContainer.innerHTML = displayCategory;

  const categoryItems = document.querySelectorAll(".category-item");
  for (let i = 0; i < 12; i++) {
    if (quizType === "author") {
      if (isPlayedAuthor[i] === true) {
        categoryItems[i].classList.add("category-item-played");
      }
    }
    if (quizType === "picture") {
      if (isPlayedPicture[i] === true) {
        categoryItems[i].classList.add("category-item-played");
      }
    }
  }
}

artists.addEventListener("click", setQuestions);
pictures.addEventListener("click", setQuestions);

const buttonHome = document.querySelector(".categories__button");
buttonHome.addEventListener("click", () => {
  categories.classList.add("hide");
  mainScreen.classList.remove("hide");
});

const buttonSettings = document.querySelector(".button-settings");
buttonSettings.addEventListener("click", () => {
  mainScreen.classList.add("hide");
  settings.classList.remove("hide");
});