import {
  quizType,
  questions,
  questionsAmount,
  newQuestions,
  mainScreen,
} from "./mainPage.js";

import { categories } from "./categories.js";
import { playAudio} from "./settings.js";

export {
  renderQuestion,
  questionElement,
  categoryId,
  isCorrectAuthor,
  isCorrectPicture,
  isPlayedAuthor,
  isPlayedPicture,
};

const categoriesContainer = document.querySelector(".categories__items");
const questionElement = document.querySelector(".question");
const questionContainer = document.querySelector(".question-wrapper");
const questionText = document.querySelector(".question-author-text");
const modal = document.querySelector(".modal");

let correctAnswer;
let questionId;
let correctAnswersAmount;
let categoryId;
let isPlayedAuthor = [];
let isPlayedPicture = [];
let isCorrectAuthor = [];
let isCorrectPicture = [];

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function setCorrect() {
  for (let i = 0; i < 12; i++) {
    isCorrectAuthor[i] = [];
    isCorrectPicture[i] = [];
  }

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 10; j++) {
      isCorrectAuthor[i][j] = false;
      isCorrectPicture[i][j] = false;
    }
  }
}
setCorrect();

function renderPictureQuestion() {
  questionContainer.innerHTML = "";
  const pictureInnerContainer = document.createElement("div");
  pictureInnerContainer.classList.add("picture-container");
  questionContainer.append(pictureInnerContainer);
  let author = newQuestions[categoryId][questionId].author;

  questionText.textContent = `Какую картину нарисовал ${author}?`;

  correctAnswer = newQuestions[categoryId][questionId].imageNum;

  const answers = new Set();
  answers.add(correctAnswer);
  while (answers.size < 4) {
    let i = getRandom(0, questions.length - 1);
    if (questions[i].author !== author) {
      answers.add(questions[i].imageNum);
    }
  }

  const arrayAnswers = Array.from(answers);
  shuffle(arrayAnswers);

  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  arrayAnswers.map((item, index) => {
    const img = document.createElement("img");
    img.classList.add("question-picture__item");
    img.src = `${src}${item}.jpg`;
    // img.setAttribute('id', index);
    img.setAttribute("data-answer", item);
    img.alt = `picture${index + 1}`;
    //  img.onload = function () { pictureInnerContainer.append(img) };
    pictureInnerContainer.append(img);
  });

  pictureInnerContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("question-picture__item")) {
      checkAnswer(e);
    }
  });
}
function renderAuthorQuestion() {
  questionContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("question-author__wrapper");
  questionContainer.append(wrapper);

  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  questionText.textContent = `Кто автор данной картины?`;

  let num = newQuestions[categoryId][questionId].imageNum;
  const img = document.createElement("img");
  // img.classList.add("question-author__picture");
  img.src = `${src}${num}.jpg`;
  img.alt = "picture";

  wrapper.append(img);

  correctAnswer = newQuestions[categoryId][questionId].author;

  const answers = new Set();
  answers.add(correctAnswer);

  while (answers.size < 4) {
    let i = getRandom(0, questions.length - 1);
    answers.add(questions[i].author);
  }

  const arrayAnswers = Array.from(answers);

  shuffle(arrayAnswers);

  const ul = document.createElement("ul");
  ul.classList.add("question-author__answers", "answers");
  arrayAnswers.map((item) => {
    const li = document.createElement("li");
    li.classList.add("answers__item");
    li.textContent = item;
    // img.setAttribute('id', index);
    li.setAttribute("data-answer", item);
    ul.append(li);
  });

  questionContainer.append(ul);

  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("answers__item")) {
      checkAnswer(e);
    }
  });
}

function renderQuestion() {
  if (quizType === "author") {
    renderAuthorQuestion();
  } else {
    renderPictureQuestion();
  }
}

function checkAnswer(el) {
  showCorrectAnswer();
  // const isCorrect = (el.target.dataset.answer === correctAnswer) ? true : false;
  const modalAnswer = document.querySelector(".modal__answer");
  const progressBarItems = document.querySelectorAll(".progress-bar__item");
  if (el.target.dataset.answer === correctAnswer) {

    if (quizType === "author") {
      isCorrectAuthor[categoryId][questionId] = true;
    } else {
      isCorrectPicture[categoryId][questionId] = true;
    }
    modalAnswer.classList.add("correct");
    progressBarItems[questionId].classList.add("progress-bar__item_correct");
    correctAnswersAmount++;
    playAudio("correct");
  } else {

    if (quizType === "author") {
      isCorrectAuthor[categoryId][questionId] = false;
    } else {
      isCorrectPicture[categoryId][questionId] = false;
    }
    playAudio("wrong");
    modalAnswer.classList.add("wrong");
    progressBarItems[questionId].classList.add("progress-bar__item_wrong");
  }
}

function showCorrectAnswer() {

  const modalContent = document.querySelector(".modal__content");
  
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  const answer = newQuestions[categoryId][questionId].imageNum;
  const name = newQuestions[categoryId][questionId].name;
  const author = newQuestions[categoryId][questionId].author;
  const year = newQuestions[categoryId][questionId].year;

  modalContent.innerHTML = "";

  const modalAnswer = document.createElement("div");
  modalAnswer.classList.add("modal__answer");

  const modalImg = document.createElement("img");
  modalImg.classList.add("modal__img");
  modalImg.src = `${src}${answer}.jpg`;
  const modalTitle = document.createElement("div");
  modalTitle.classList.add("modal__title", "text");
  modalTitle.textContent = `${name}`;
  const modalAuthor = document.createElement("div");
  modalAuthor.classList.add("modal__author", "text");
  modalAuthor.textContent = `${author}`;
  const modalYear = document.createElement("div");
  modalYear.classList.add("modal__year", "text");
  modalYear.textContent = `${year}`;

  const modalButton = document.createElement("button");
  modalButton.classList.add("button", "button-next");
  modalButton.textContent = "Next";
  modalContent.append(modalAnswer);
  modalContent.append(modalImg);
  modalContent.append(modalTitle);
  modalContent.append(modalAuthor);
  modalContent.append(modalYear);
  modalContent.append(modalButton);

  /*
  let displayAnswer = '';

  displayAnswer =  
  `<div class="modal__body">
		<div class="modal__content">
    <div class="modal__answer">
   </div>
    <img src = "${src}${answer}.jpg" class="modal__img" alt = "img"></img>
    <h2 class="text modal__title">${name}</h2>
    <p class="text modal__author">${author}</p>
    <p class="text modal__year">${year}</p>
    <button class="button button-next">Next</button>
    </div>
		</div>`

    modal.innerHTML = displayAnswer;
  */
  modal.classList.add("open");

  modalButton.addEventListener("click", getNextQuestion);
}

function getNextQuestion() {
  questionId++;
  if (questionId < questionsAmount) {
    modal.classList.remove("open");
    renderQuestion();
  } else {
    modal.classList.remove("open");
    showCategoryResult();
    const categotyItem = document.querySelector(
      `.category-item[id="${categoryId}"]`
    );

    const categotyTitle = document.querySelector(
      `.category-item[id="${categoryId}"] .category-item__total`
    );

    categotyTitle.textContent = correctAnswersAmount;
    categotyItem.classList.add("category-item-played");

    if (quizType === "author") {
      isPlayedAuthor[categoryId] = true;
    } else {
      isPlayedPicture[categoryId] = true;
    }
  }
}

function showCategoryResult() {
  const modalContent = document.querySelector(".modal__content");
  modalContent.innerHTML = "";

  const modalCong = document.createElement("div");
  modalCong.classList.add("modal__cong");
  modalCong.textContent = "Congratulations!";

  const modalResult = document.createElement("div");
  modalResult.classList.add("modal__result");
  modalResult.textContent = `${correctAnswersAmount} / ${questionsAmount}`;

  const modalGood = document.createElement("div");
  modalGood.classList.add("modal__good");

  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal__wrapper");

  const modalButtonNext = document.createElement("button");
  modalButtonNext.classList.add("button", "button-next-quiz");
  modalButtonNext.textContent = "Next Quiz";

  const modalButtonHome = document.createElement("button");
  modalButtonHome.classList.add("button", "modal-button-home");
  modalButtonHome.textContent = "Home";

  modalContent.append(modalCong);
  modalContent.append(modalResult);
  modalContent.append(modalGood);
  modalContent.append(modalWrapper);
  modalWrapper.append(modalButtonNext);
  modalWrapper.append(modalButtonHome);

  modal.classList.add("open");
  modalButtonNext.addEventListener("click", () => {
    modal.classList.remove("open");
    questionElement.classList.add("hide");
    categories.classList.remove("hide");
  });

  modalButtonHome.addEventListener("click", () => {
    modal.classList.remove("open");
    questionElement.classList.add("hide");
    mainScreen.classList.remove("hide");
  });
   playAudio('congrat');
}

function renderProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  let displayProgress = "";
  for (let i = 0; i < 10; i++) {
    displayProgress += `<div class = 'progress-bar__item'></div>`;
  }
  progressBar.innerHTML = displayProgress;
}

categoriesContainer.addEventListener("click", (e) => {
  if (
    e.target.closest(".category-item") &&
    !e.target.closest(".category-item__score")
  ) {
    categoryId = e.target.closest(".category-item").id;
    correctAnswersAmount = 0;
    questionId = 0;

    renderQuestion();
    renderProgressBar();
    categories.classList.add("hide");
    questionElement.classList.remove("hide");
  }
});

const buttonHome = document.querySelector(".question__button-home");
buttonHome.addEventListener("click", () => {
  questionElement.classList.add("hide");
  mainScreen.classList.remove("hide");
});

const buttonCategories = document.querySelector(".question__button-categories");

buttonCategories.addEventListener("click", () => {
  questionElement.classList.add("hide");
  categories.classList.remove("hide");
});
