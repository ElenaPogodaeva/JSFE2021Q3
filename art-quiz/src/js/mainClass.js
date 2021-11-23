import Categories from "./categoriesClass.js";

class mainPage {
  constructor() {
    this.mainScreen = document.querySelector(".main-screen");
    this.menu = document.querySelector(".menu");
    this.categoriesPage = document.querySelector(".categories");
    this.artists = document.querySelector(".artists");
    this.pictures = document.querySelector(".pictures");
    
    this.quizType;
    this.categories = {};

    this.pictures.addEventListener("click", () => {
      this.quizType = "author";
      this.getCategories();
    });
    this.menu.addEventListener("click", () => {
      this.quizType = "picture";
      this.getCategories();
    });
  }

  async getCategories() {
    try {
      // const quizType = e.target.id;
      console.log(this.quizType);
      const src = `./assets/data/data.json`;
      let questions;
      let questionsByAuthor = [];
      let questionsByName = [];
      const data = await this.fetchData(src);

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

      this.toggleVisibility();
      this.category = new Categories(
        this.categoriesPage,
        questionsByAuthor,
        data
      );
    } catch (error) {
      alert(error);
    }
  }

  toggleVisibility() {
    this.mainScreen.classList.add("hide");
    this.categoriesPage.classList.remove("hide");
  }

  async fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }
}

export default mainPage;
