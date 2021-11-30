export {questionId, correctAnswersAmount, showResultPage, categoriesContainer, categories}
import {isCorrectAuthor, isCorrectPicture} from './question.js'
import {newQuestions, mainScreen, quizType} from './mainPage.js'

const categories = document.querySelector(".categories");
const categoriesContainer = document.querySelector(".categories__items");

let questionId;
let correctAnswersAmount;
let categoryId;

function showResultPage() {
  const scoreContainer = document.querySelector(".score__items");
  let displayResult = "";
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;
  scoreContainer.innerHTML = "";
  newQuestions[categoryId].forEach((item, index) => {

    displayResult = `<div class="score__item score-item" id = "${index}">
     <div class="score-item__header">
       <div class="score-item__title">01</div>
     </div>
     <div class="score-item__img">
       <img src = ${src}${item.imageNum}.jpg>     
     </div>
     <div class="score-item__info">
       <p class="score-item__text text">${item.name}</p>
       <p class="score-item__text text">${item.author}</p>
       <p class="score-item__text text">${item.year}</p>
     </div>
    </div>`;

    scoreContainer.insertAdjacentHTML("afterbegin", displayResult);

    const scoreItem = document.querySelector(".score__item");
    if (quizType === 'author') {
      if (isCorrectAuthor[categoryId][index] === true) {
        scoreItem.classList.add("score-item-correct");
      }
    }
    else {
      if (isCorrectPicture[categoryId][index] === true) {
        scoreItem.classList.add("score-item-correct");
      }
    }
  });

  

  const scoreItems = Array.from(document.querySelectorAll(".score__item"));
  scoreItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const scoreItemsInfo = document.querySelectorAll(".score-item__info");
      scoreItemsInfo[index].classList.toggle("score-item__info_show");
    });
  });
}


const score = document.querySelector(".score");
categoriesContainer.addEventListener("click", (e) => {
  if (e.target.closest(".category-item__score")) {
    categories.classList.add("hide");
     score.classList.remove("hide");
  }
});

const buttonHome = document.querySelector(".score__home");

buttonHome.addEventListener("click", () => {
  score.classList.add("hide");
  mainScreen.classList.remove("hide");
});
const buttonCategories = document.querySelector(".score__categories");

buttonCategories.addEventListener("click", () => {
  score.classList.add("hide");
  categories.classList.remove("hide");
});

categoriesContainer.addEventListener("click", (e) => {
  if (e.target.closest(".category-item__score")) {
    categoryId = e.target.closest(".category-item__score").id;
    showResultPage();
  }
});



