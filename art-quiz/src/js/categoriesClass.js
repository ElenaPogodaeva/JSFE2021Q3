import Category from "./category.js";

class Categories {
  constructor(categoriesPage, questions, data) {
    this.categoriesPage = categoriesPage;
    // this.data = data;
    this.questions = this.setCategory(questions, data);

    this.categoriesContainer = document.querySelector(".categories__items");
    this.renderCategories(questions);
    this.categoryItems = document.querySelectorAll(".category-item");
    this.categoryItems.forEach((item) =>
      item.addEventListener("click", (e) => this.startQuiz(e))
    );
    // this.renderCategory();
    // this.categoriesContainer = document.querySelector(".categories__items");
  }

  setCategory(questions, data) {
    let newQuestions = this.chunkArray(questions, 10);
    return newQuestions.map(
      (categoryQuestions) => new Category(categoryQuestions, data)
    );
  }

  renderCategories(questions) {
    let displayCategory = "";
    const src = `https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/`;
    let newQuestions = this.chunkArray(questions, 10);
    newQuestions.map((item, index) => {
      const img = document.createElement("img");
      img.src = `${src}${item[0]["imageNum"]}.jpg`;
      displayCategory += `<div class="categories__item category-item" id = "${index}">
     <div class="category-item__header">
       <div class="category-item__title">01</div>
       <div class="category-item__total">2</div>
     </div>
     <div class="category-item__img">
       <img src = ${img.src}>     
     </div>
   </div>`;
    });

    this.categoriesContainer.innerHTML = displayCategory;
    console.log(this.categoriesContainer.innerHTML);
  }

  chunkArray(array, chunk) {
    const newArray = [];
    for (let i = 0; i < array.length; i += chunk) {
      newArray.push(array.slice(i, i + chunk));
    }
    return newArray;
  }
  startQuiz(el) {
    const categoryId = el.target.closest(".category-item").id;
    this.questions[categoryId].renderQuestion();
  }
}

export default Categories;
