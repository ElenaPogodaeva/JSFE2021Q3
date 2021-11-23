class Question {
  constructor(question, data) {
    //this.question = question;
    this.questionElement = document.querySelector(".question-author-text");
    this.pictureInnerContainer = document.querySelector(".picture-container");
    this.author = question.author;
    this.imageNum = question.imageNum;
    // this.answers = this.shuffleAnswers(question);
    this.data = data;
    console.log(this.imageNum);
  }

  render() {
    let author = this.author;

    this.questionElement.textContent = `Какую картину нарисовал ${author}?`;

    const correctAnswer = this.imageNum;

    const answers = new Set();
    answers.add(correctAnswer);

    while (answers.size < 4) {
      let i = this.getRandom(0, this.data.length - 1);

      answers.add(this.data[i].imageNum);
    }

    const arrayAnswers = Array.from(answers);
    const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

    this.shuffle(arrayAnswers);
    this.pictureInnerContainer.innerHTML = "";
    arrayAnswers.map((item, index) => {
      const img = document.createElement("img");
      img.classList.add("question-picture__item");
      img.src = `${src}${item}.jpg`;
      // img.setAttribute('id', index);
      img.setAttribute("data-answer", item);
      img.alt = `picture${index + 1}`;
      this.pictureInnerContainer.append(img);
    });
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkAnswer(answer) {
    this.isCorrect = answer === this.correctAnswer ? true : false;
  }
  showCorrectAnswer() {
    // const modal = document.querySelector('.modal');
    const modalContent = document.querySelector(".modal__content");

    const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;

    const answer = this.imageNum;
    const name = this.name;
    const author = this.author;
    const year = this.year;

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
}

export default Question;
