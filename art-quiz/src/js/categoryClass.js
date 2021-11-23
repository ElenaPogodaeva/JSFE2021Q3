import Question from "./questionClass.js";

class Category {
  constructor(categoryQuestions, data) {
    this.categoryQuestions = this.setQuestions(categoryQuestions, data);
    this.questionId = 0;
    this.questionsAmount = 10;
    this.pictureInnerContainer = document.querySelector(".picture-container");

    this.pictureInnerContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("question-picture__item")) {
        checkAnswer(e);
      }
    });

    // this.renderCategory(categoryQuestions);
  }

  checkAnswer(el) {
    const answer = el.id;
    this.categoryQuestions[this.questionId].checkAnswer(answer);
    const modalAnswer = document.querySelector(".modal__answer");
    const progressBarItems = document.querySelectorAll(".progress-bar__item");
    if (this.questions[this.answeredAmount].isCorrect) {
      modalAnswer.classList.add("correct");
      progressBarItems[questionId].classList.add("progress-bar__item_correct");
      correctAnswersAmount++;
    } else {
      modalAnswer.classList.add("wrong");
      progressBarItems[questionId].classList.add("progress-bar__item_wrong");
    }
    this.categoryQuestions[this.questionId].showCorrectAnswer();
    const modalButtonNext = document.querySelector(".button-next");
    modalButtonNext.addEventListener("click", this.nextQuestion);
  }

  setQuestions(categoryQuestions, data) {
    return categoryQuestions.map((question) => new Question(question, data));
  }

  renderQuestion() {
    this.categoryQuestions[this.questionId].render();
  }

  nextQuestion() {
    this.questionId++;
    this.questionId < this.questionsAmount
      ? this.renderQuestion()
      : this.showCategoryResult();
  }
  showResult() {
    this.questions[this.questionId].showCorrectAnswer();
  }

  showCategoryResult() {
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
}

export default Category;
