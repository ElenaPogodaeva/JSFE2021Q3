const mainScreen = document.querySelector(".main-screen");
const question = document.querySelector(".question-author-text");
const artists = document.querySelector(".artists");
const pictures = document.querySelector(".pictures");
const categoriesContainer = document.querySelector(".categories__items");
const pictureInnerContainer = document.querySelector(".picture-container");

artists.addEventListener("click", setQuestions);

pictures.addEventListener("click", setQuestions);

//const dataLength = data.length;

let questions;
let newQuestions;
let isCorrect = false;
let correctAnswer;
let categoryId = 0;
let questionId = 0;

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

  questions.map((item, index) => {
    const img = document.createElement("img");

    // const categoryItem = document.createElement('div');
    // categoryItem.classList.add('category-item');
    // categoryItem.setAttribute('id', index);

    //  img.classList.add('category-item__img');
    img.src = `${src}${item[0].imageNum}.jpg`;

    // img.alt = `category-img${index + 1}`;
    // categoryItem.append(img);

    /*
   const categoryHeader = document.createElement('div');
   categoryHeader.classList.add('category-item__header');

   const categoryTitle = document.createElement('div');
   categoryTitle.classList.add('category-item__title');

   const categoryTotal = document.createElement('div');
   categoryTotal.classList.add('category-item__total');
  // const categoryImg = document.createElement('img');
  // categoryImg.classList.add('category-item__img');
  // categoryImg.src = img.src;
  categoryItem.appendChild(categoryHeader);
  categoryHeader.appendChild(categoryTitle);
  categoryHeader.appendChild(categoryTotal);
  
  categoriesContainer.appendChild(categoryItem);*/

    displayCategory += `<div class="categories__item category-item" id = "${index}">
     <div class="category-item__header">
       <div class="category-item__title">01</div>
       <div class="category-item__total">2</div>
     </div>
     <div class="category-item__img">
       <img src = ${img.src}>     
     </div>
   </div>`;

    //  categoriesContainer.appendChild(displayCategory);
  });

  categoriesContainer.innerHTML = displayCategory;
  renderProgressBar();
}

function renderQuestion() {
  //let categoryId = 0;
  // console.log('catid'+this.id)
  // console.log(questionsArr[categoryId][questionId]);
  let author = newQuestions[categoryId][questionId].author;

  question.textContent = `Какую картину нарисовал ${author}?`;

  correctAnswer = newQuestions[categoryId][questionId].imageNum;

  const answers = new Set();
  answers.add(correctAnswer);
  // let result = [];
  while (answers.size < 4) {
    let i = getRandom(0, questions.length - 1);

    answers.add(questions[i].imageNum);
  }

  const arrayAnswers = Array.from(answers);
  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  shuffle(arrayAnswers);
  pictureInnerContainer.innerHTML = "";
  arrayAnswers.map((item, index) => {
    const img = document.createElement("img");
    img.classList.add("question-picture__item");
    img.src = `${src}${item}.jpg`;
    // img.setAttribute('id', index);
    img.setAttribute("data-answer", item);
    img.alt = `picture${index + 1}`;
    pictureInnerContainer.append(img);
  });
}


async function setQuestions() {
  try {
    const quizType = this.id;
    const src = `./assets/data/data.json`;

    const data = await fetchData(src);

    const questionsByAuthor = [];
    const questionsByName = [];

    if (quizType === "author") {
      questions = data.slice(0, 120);
    } else {
      questions = data.slice(120);
    }
    console.log(questions);
    /*
    data.forEach((item, index) => {
      if (index % 2 === 0) {
        questionsByAuthor.push({
          ...item,
          type: "author",
        });
      }

      if (index % 2 !== 0) {
        questionsByName.push({
          ...item,
          type: "name",
        });
      }
    });
*/

    newQuestions = chunkArray(questions, 10);
    renderCategory(newQuestions);

    // const newQuestions = chunkArray(questionsByName, 10);
    /*
    if (quizType === '1') {
      renderCategory(questions);
      return questionsByAuthor;//renderCategory(newQuestionsByAuthor);
    }
    else {
      return questionsByName;//renderCategory(newQuestionsByName);
    }*/
    //  renderCategory(questions);
    /*  const questions = {
      questionsByAuthor: newQuestionsByAuthor,
      questionsByName: newQuestionsByName,
    };
  
    console.log(questions);
    return questions;*/
  } catch (error) {
    alert(error);
  }
}

function renderProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  let displayProgress = "";
  for (let i = 0; i < 10; i++) {
    displayProgress += `<div class = 'progress-bar__item'></div>`;
  }
  progressBar.innerHTML = displayProgress;
}

function showCorrectAnswer() {
  // const modal = document.querySelector('.modal');
  // const modalContent = document.querySelector('.modal__content');
  // const modalBody = document.querySelector('.modal__body');

  const modalImg = document.querySelector(".modal__img");
  const modalTitle = document.querySelector(".modal__title");
  const modalAuthor = document.querySelector(".modal__author");
  const modalYear = document.querySelector(".modal__year");

  const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

  const answer = newQuestions[categoryId][questionId].imageNum;
  const name = newQuestions[categoryId][questionId].name;
  const author = newQuestions[categoryId][questionId].author;
  const year = newQuestions[categoryId][questionId].year;

  modalImg.src = `${src}${answer}.jpg`;

  modalTitle.textContent = `${name}`;
  modalAuthor.textContent = `${author}`;
  modalYear.textContent = `${year}`;
  /*
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal__body');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  const modalAnswer = document.createElement('div');
  modalAnswer.classList.add('modal__answer');
  
  const modalImg = document.createElement('img');
  modalImg.classList.add('modal__img');
  modalImg.src = `${src}${answer}.jpg`;
  const modalTitle = document.createElement('div');
  modalTitle.classList.add('modal__title', 'text');
  modalTitle.textContent = `${name}`;
  const modalAuthor = document.createElement('div');
  modalAuthor.classList.add('modal__author', 'text');
  modalAuthor.textContent = `${author}`;
  const modalYear = document.createElement('div');
  modalYear.classList.add('modal__year', 'text');
  modalYear.textContent = `${year}`;

 
  modalContent.prepend(modalYear);
  modalContent.prepend(modalAuthor);
  modalContent.prepend(modalTitle);
  modalContent.prepend(modalImg);
  modalContent.prepend(modalAnswer);
  
*/
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
}

function checkAnswer(el) {
  // const isCorrect = (el.target.dataset.answer === correctAnswer) ? true : false;
  const modalAnswer = document.querySelector(".modal__answer");
  const progressBarItems = document.querySelectorAll(".progress-bar__item");
  if (el.target.dataset.answer === correctAnswer) {
    modalAnswer.classList.add("correct");
    progressBarItems[questionId].classList.add("progress-bar__item_correct");
  } else {
    modalAnswer.classList.add("wrong");
    progressBarItems[questionId].classList.add("progress-bar__item_wrong");
  }
  showCorrectAnswer();
}

function getNextQuestion() {
  if (questionId < 10) {
    questionId++;
    console.log(questionId);
  }
  modal.classList.remove("open");
  renderQuestion();
}
categoriesContainer.addEventListener("click", (e) => {
  if (e.target.closest(".category-item")) {
    categoryId = e.target.closest(".category-item").id;
    questionId = 0;
    renderQuestion();
  }
});

pictureInnerContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("question-picture__item")) {
    checkAnswer(e);
  }
});

const buttonNext = document.querySelector(".button-next");
console.log(buttonNext);

buttonNext.addEventListener("click", getNextQuestion);




/*
toggleVisibility() {
  this.settingsElement.style.visibility = "hidden";
  this.quizElement.style.visibility = "visible";
}

function renderCategory() {



  this.questions[this.answeredAmount].render();
  this.currentElement.innerHTML = this.answeredAmount;
  this.totalElement.innerHTML = this.totalAmount;
}*/

//getQuizType();
