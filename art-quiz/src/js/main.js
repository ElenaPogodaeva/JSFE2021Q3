const mainScreen = document.querySelector(".main-screen");
const question = document.querySelector(".question-author-text");
const artists = document.querySelector(".artists");
const pictures = document.querySelector(".pictures");
const categories = document.querySelector(".categories");
const questionContainer = document.querySelector(".question");
const categoriesContainer = document.querySelector(".categories__items");

const questionElement = document.querySelector(".question-container");

//const dataLength = data.length;

let questions;
let newQuestions;
let correctAnswer;
let categoryId;
let questionId = 0;
let questionsAmount;
let correctAnswersAmount = 0;
let isCorrect = [];
let quizType;

function chunkArray(array, chunk) {
  const newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}

const splitArr = (arr, chunks) =>
  [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
async function fetchData(url) {
  const response = await fetch(url);
  const result = await response.json();

  return result;
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
}

function renderPictureQuestion() {
  questionElement.innerHTML = "";
  const pictureInnerContainer = document.createElement("div");
  pictureInnerContainer.classList.add("picture-container");
  questionElement.append(pictureInnerContainer);
  let author = newQuestions[categoryId][questionId].author;

  question.textContent = `Какую картину нарисовал ${author}?`;

  correctAnswer = newQuestions[categoryId][questionId].imageNum;

  const answers = new Set();
  answers.add(correctAnswer);
  while (answers.size < 4) {
    let i = getRandom(0, questions.length - 1);

    answers.add(questions[i].imageNum);
  }

  const arrayAnswers = Array.from(answers);
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  shuffle(arrayAnswers);
 
  arrayAnswers.map((item, index) => {
    const img = document.createElement("img");
    img.classList.add("question-picture__item");
    img.src = `${src}${item}.jpg`;
    // img.setAttribute('id', index);
    img.setAttribute("data-answer", item);
    img.alt = `picture${index + 1}`;
    pictureInnerContainer.append(img);
  });

  pictureInnerContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("question-picture__item")) {
      checkAnswer(e);
    }
  });
}
function renderAuthorQuestion() {
  questionElement.innerHTML = "";
 
  const wrapper = document.createElement("div");
  wrapper.classList.add("question-author__wrapper");
  questionElement.append(wrapper);

  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  question.textContent = `Кто автор данной картины?`;

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

  questionElement.append(ul);

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
  console.log(isCorrect);
  renderProgressBar();
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
    console.log(questions);
    
    questionsAmount = 10;
    newQuestions = chunkArray(questions, 10);
    renderCategory(newQuestions);
    mainScreen.classList.add("hide");
    categories.classList.remove("hide");

    /*   mainScreen.classList.add('visuallyhide');
   // mainScreen.classList.add('hide');
    setTimeout(function () {
      mainScreen.classList.add('hide');
    }, 1000);
    categories.classList.remove('hide');
  //  categories.classList.remove('visuallyhide');
   // mainScreen.classList.add('hide');
    setTimeout(function () {
      categories.classList.remove('visuallyhide');
    }, 1000);*/
    /* mainScreen.addEventListener('transitionend', function(e) {
    mainScreen.classList.add('hide');
  }, {
    once: true,
  });
    */

  } catch (error) {
    alert(error);
  }
}

function renderProgressBar() {
  const progressBar = document.createElement("div");

  progressBar.classList.add("progress-bar");
  if (quizType === "picture") {
    const pictureContainer = document.querySelector(".picture-container");
    pictureContainer.append(progressBar);
  } else {
    const pictureContainer = document.querySelector(".question-author__wrapper");
    pictureContainer.append(progressBar);
  }

  let displayProgress = "";
  for (let i = 0; i < 10; i++) {
    displayProgress += `<div class = 'progress-bar__item'></div>`;
  }
  progressBar.innerHTML = displayProgress;
  const progressBarItems = document.querySelectorAll(".progress-bar__item");
  console.log(progressBarItems);
  for (let i = 0; i < questionId; i++) {
    if (isCorrect[i] === true) {
      progressBarItems[i].classList.add("progress-bar__item_correct");
      console.log(progressBarItems[i]);
    } else {
      progressBarItems[i].classList.add("progress-bar__item_wrong");
    }
  }
}

function showCategoryResult() {
  const modalContent = document.querySelector(".modal__content");
  modalContent.innerHTML = "";

  const modalCong = document.createElement("div");
  modalCong.classList.add("modal__cong", "text");
  modalCong.textContent = "Congratulations!";

  const modalResult = document.createElement("div");
  modalResult.classList.add("modal__result", "text");
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
    questionContainer.classList.add("hide");
    categories.classList.remove("hide");
  });

  modalButtonHome.addEventListener("click", () => {
    modal.classList.remove("open");
    questionContainer.classList.add("hide");
    mainScreen.classList.remove("hide");
  });
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

function checkAnswer(el) {
  showCorrectAnswer();
  // const isCorrect = (el.target.dataset.answer === correctAnswer) ? true : false;
  const modalAnswer = document.querySelector(".modal__answer");
  const progressBarItems = document.querySelectorAll(".progress-bar__item");
  if (el.target.dataset.answer === correctAnswer) {
    isCorrect[questionId] = true;
    modalAnswer.classList.add("correct");
    // progressBarItems[questionId].classList.add("progress-bar__item_correct");
    correctAnswersAmount++;
  } else {
    isCorrect[questionId] = false;
    modalAnswer.classList.add("wrong");
    //  progressBarItems[questionId].classList.add("progress-bar__item_wrong");
  }

  console.log(questionId);
  console.log(correctAnswersAmount);
}

function getNextQuestion() {
  questionId++;
  if (questionId < questionsAmount) {
    modal.classList.remove("open");
    renderQuestion();

    console.log(isCorrect);
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
  }
}

function showResultPage() {
  const scoreContainer = document.querySelector(".score__items");
  let displayResult = "";
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

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
    if (isCorrect[index] === true) {
      scoreItem.classList.add("score-item-correct");
    }
  });
  //  const score = document.querySelector(".score__items");
  const scoreItems = Array.from(document.querySelectorAll(".score__item"));
  scoreItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const scoreItemsInfo = document.querySelectorAll(".score-item__info");
      scoreItemsInfo[index].classList.toggle("score-item__info_show");
    });
  });
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

    questionContainer.classList.remove("hide");
  }
});

categoriesContainer.addEventListener("click", (e) => {
  if (e.target.closest(".category-item__score")) {
    categoryId = e.target.closest(".category-item__score").id;
    console.log(isCorrect);
    showResultPage();
  }
});

const buttonHomeCategories = document.querySelector(".categories__button");
buttonHomeCategories.addEventListener("click", () => {
  categories.classList.add("hide");
  mainScreen.classList.remove("hide");
 // mainScreen.classList.remove("visuallyhide");
});
const buttonHomeQuestion = document.querySelector(".question__button-home");
buttonHomeQuestion.addEventListener("click", () => {
  questionContainer.classList.add("hide");
  mainScreen.classList.remove("hide");
});

const buttonCategoriesQuestion = document.querySelector(".question__button-categories");

buttonCategoriesQuestion.addEventListener("click", () => {
  questionContainer.classList.add("hide");
  categories.classList.remove("hide");
});

//const buttonScore = document.querySelector(".category-item__score");
const score = document.querySelector(".score");
categoriesContainer.addEventListener("click", (e) => {
  if (e.target.closest(".category-item__score")) {
  categories.classList.add("hide");
  score.classList.remove("hide");
  }
});

const buttonScoreHome = document.querySelector(".score__home");

buttonScoreHome.addEventListener("click", () => {
  score.classList.add("hide");
  mainScreen.classList.remove("hide");
});
const buttonScoreCategories = document.querySelector(".score__categories");

buttonScoreCategories.addEventListener("click", () => {
  score.classList.add("hide");
  categories.classList.remove("hide");
});
artists.addEventListener("click", setQuestions);

pictures.addEventListener("click", setQuestions);

