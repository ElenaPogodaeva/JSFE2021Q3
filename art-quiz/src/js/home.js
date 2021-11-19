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
