import data from './data';
import {Toy} from './types';
import noUiSlider, {target, API} from 'nouislider';

let selectedCards:string[] = [];
let selectedCount:number = 0;
const maxSelectCount = 20;
const cardsContainer = document.querySelector(".cards") as HTMLElement;
const sortSelect = document.querySelector(".sort__select") as HTMLSelectElement;
const shapeContainer = document.querySelector(".shape") as HTMLElement;
const colorContainer = document.querySelector(".color") as HTMLElement;
const sizeContainer = document.querySelector(".size") as HTMLElement;
const favoriteCheckbox =  document.querySelector('.favorite__checkbox') as HTMLInputElement;
const resetFiltersBtn = document.getElementById("reset-filters") as HTMLElement;
const resetStorageBtn = document.getElementById("reset-storage") as HTMLElement;
const searchInput = document.querySelector(".search") as HTMLInputElement;
const colorCheckboxes =  Array.from(document.querySelectorAll('input.color__checkbox') as NodeListOf<HTMLInputElement>);
const shapeBtns = Array.from(document.querySelectorAll('.shape__btn')  as NodeListOf<HTMLElement>);
const sizeBtns = Array.from(document.querySelectorAll('.size__btn')  as NodeListOf<HTMLElement>);
const selectedCountEl = document.querySelector(".select span") as HTMLElement;

let filteredByCount:string[] = data.map(item => item.num);
let filteredByYear:string[] = data.map(item => item.num);
let filteredByShape:string[] = data.map(item => item.num);
let filteredByColor:string[] = data.map(item => item.num);
let filteredBySize:string[] = data.map(item => item.num);
let filteredByFavorite:string[] = data.map(item => item.num);
let filteredData:Toy[];// = data.slice();
let searchData:string[] = data.map(item => item.num);

function drawCards(data: Toy[]): void {
  cardsContainer.innerHTML = '';
  if (data.length === 0) {
    cardsContainer.innerHTML = `<p class="not-found">Извините, совпадений не обнаружено</p>`;
    return;
  }
  data.forEach((item) => {
    let card = '';
    const src = `../assets/toys/${item.num}.png`;
    card = `<div class="card${selectedCards.includes(item.num) ? ' active' : ''}" data-num = ${item.num}>
              <h2 class="card__title">${item.name}</h2>
              <div class="card__content">
                <img class="card__img" src=${src} alt="toy">
                <div class="card__description">
                  <p class="count">Количество: <span>${item.count}</span></p>
                  <p class="year">Год покупки: ${item.year}</p>
                  <p class="shape">Форма: ${item.shape}</p>
                  <p class="color">Цвет: ${item.color}</p>
                  <p class="size">Размер: ${item.size}</p>
                  <p class="favorite">Любимая: ${item.favorite ? 'да' : 'нет'}</p>
                </div>
                <div class="card__button"></div>
              </div>
              <span class="popuptext" data-num="${item.num}">Извините, все слоты заполнены</span>
            </div>`;
    
    //cardsContainer.innerHTML+=card;
    cardsContainer.insertAdjacentHTML('beforeend', card);
  });
}
//drawCards(data);
filter();
searchInput.focus();


function addCard(e: Event): void {
  let cardNum: string;
  const card = (e.target as HTMLElement).closest('.card') as HTMLElement;

  if ((e.target as HTMLElement).closest('.card')) {
    cardNum = card.dataset.num as string;

    let popupItems = Array.from(document.querySelectorAll('.popuptext')  as NodeListOf<HTMLElement>);
    popupItems = popupItems.filter(el => el.dataset.num !== cardNum);
    popupItems.forEach(item => {
      if (item.classList.contains('show')) {
        item.classList.remove('show');
      }
    });

    if (!card.classList.contains('active') && (selectedCards.length < maxSelectCount)) {
      selectedCards.push(cardNum);
      card.classList.add('active');
    }
    else if (!card.classList.contains('active') && (selectedCards.length === maxSelectCount)) {
      const popupEl = document.querySelector(`.popuptext[data-num="${cardNum}"]`) as HTMLElement;
      popupEl.classList.toggle("show");
    }
    else {
      selectedCards.splice(selectedCards.indexOf(cardNum), 1);
      card.classList.remove('active');
    }
    selectedCount = selectedCards.length;
    selectedCountEl.textContent = selectedCount.toString();
  }
}

cardsContainer.addEventListener('click', (e: Event) => addCard(e));

function sortCards(): void {
  const value = sortSelect.value;
  switch(value) {
    case 'sort-name-max': 
      drawCards(sortByName());
      break;
    case 'sort-name-min': 
      drawCards(sortByName().reverse());
      break;
    case 'sort-year-max': 
      drawCards(sortByYear());
      break;
    case 'sort-year-min': 
      drawCards(sortByYear().reverse());
      break;
  }
}

sortSelect.addEventListener('change', sortCards);

function sortByName() {
  return filteredData.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByYear() {
  return filteredData.sort((a, b) => +a.year - +b.year);
}

const countSlider = document.querySelector('.count__slider')  as target;
const yearSlider = document.querySelector('.year__slider')  as target;

const countOutput1 = document.getElementById('count-output-1') as HTMLOutputElement;
const countOutput2  = document.getElementById('count-output-2') as HTMLOutputElement;
const countOutput = [countOutput1, countOutput2];
const yearOutput1 = document.getElementById('year-output-1') as HTMLOutputElement;
const yearOutput2  = document.getElementById('year-output-2') as HTMLOutputElement;
const yearOutput = [yearOutput1, yearOutput2];

noUiSlider.create(countSlider, {
    start: [1, 12],
    connect: true,
    range: {
        'min': 1,
        'max': 12
    },
    step: 1
});

noUiSlider.create(yearSlider, {
  start: [1940, 2020],
  connect: true,
  range: {
      'min': 1940,
      'max': 2020
  },
  step: 10
});

function filter() {
 // console.log(filteredByYear);
 // console.log(filteredByCount);
  filteredData = data.filter(item => filteredByCount.includes(item.num) && filteredByYear.includes(item.num) &&
  filteredByShape.includes(item.num) && filteredByColor.includes(item.num) && filteredBySize.includes(item.num) &&
  filteredByFavorite.includes(item.num) && searchData.includes(item.num));
  sortCards();
  console.log(filteredData);
  drawCards(filteredData);
}

function setOutput(output: HTMLOutputElement[], values: (string | number)[]) {
  [output[0].value, output[1].value] = [Math.round(+values[0]).toString(), Math.round(+values[1]).toString()];
}

(countSlider.noUiSlider as API).on('update', function (values, handle) { 

  let minCount = Math.round(+values[0]);
  let maxCount = Math.round(+values[1]);
  setOutput(countOutput, values);
  //countOutput[handle].value = Math.round(+values[handle]).toString();
  filteredByCount = data.filter(item => (minCount <= +item.count) && (+item.count <= maxCount))
  .map(item => item.num);
  filter();
});

(yearSlider.noUiSlider as API).on('update', function (values, handle) { 
  
  let minYear = Math.round(+values[0]);
  let maxYear = Math.round(+values[1]);
  setOutput(yearOutput, values);
  //yearOutput[handle].value = Math.round(+values[handle]).toString();
  filteredByYear = data.filter(item => (minYear <= +item.year) && (+item.year <= maxYear))
  .map(item => item.num);

  filter();
 // drawCards(filteredByYear);
  console.log('1');
});


function filterByShape(): void {

    const shapeBtns = Array.from(document.querySelectorAll('.shape__btn.active')  as NodeListOf<HTMLElement>);
    const shapeArr = shapeBtns.map(item => item.dataset.shape);
    console.log(shapeArr);
    if (shapeArr.length !== 0) {
      filteredByShape = data.filter(item => shapeArr.includes(item.shape)).map(item => item.num);
    }
    else {
      filteredByShape = data.map(item => item.num);
    }
}

shapeContainer.addEventListener('click', (e: Event) => {
  if ((e.target as HTMLElement).classList.contains('shape__btn')) {
    const shapeBtn = e.target as HTMLElement;
    shapeBtn.classList.toggle('active');
    filterByShape();
    filter();
  }
});

function filterByColor(): void {
  const colorChecked = Array.from(document.querySelectorAll('input.color__checkbox:checked')  as NodeListOf<HTMLElement>);
  const colorArr = colorChecked.map(item => item.dataset.color);
  console.log(colorArr);
  if (colorArr.length !== 0) {
    filteredByColor = data.filter(item => colorArr.includes(item.color)).map(item => item.num);
  }
  else {
    filteredByColor = data.map(item => item.num);
  }
  filter();
}

colorCheckboxes.forEach(item => item.addEventListener('change', filterByColor));

function filterBySize() {

    const sizeBtns = Array.from(document.querySelectorAll('.size__btn.active')  as NodeListOf<HTMLElement>);
    const sizeArr = sizeBtns.map(item => item.dataset.size);
    console.log(sizeArr);
    if (sizeArr.length !== 0) {
      filteredBySize = data.filter(item => sizeArr.includes(item.size)).map(item => item.num);
    }
    else {
      filteredBySize = data.map(item => item.num);
    }
   // setLocalStorage();
}

sizeContainer.addEventListener('click', (e: Event) => {
  if ((e.target as HTMLElement).classList.contains('size__btn')) {
    const sizeBtn = e.target as HTMLElement;
    sizeBtn.classList.toggle('active');
    filterBySize();
    filter();
  }
});

function filterByFavorite() {

  if (favoriteCheckbox.checked) {
    filteredByFavorite = data.filter(item => item.favorite).map(item => item.num);
  }
  else {
    filteredByFavorite = data.map(item => item.num);
  }
  filter();
}

favoriteCheckbox.addEventListener('change', filterByFavorite);


function search(): void {
  const input = searchInput.value as string;
  if (input.length !== 0) {
    searchData = data.filter(item => item.name.toLowerCase().includes(input.toLowerCase())).map(item => item.num);
  }
  else {
    searchData = data.map(item => item.num);
  }
  filter();
}

searchInput.addEventListener('input', search);

function resetFilters(): void {
  filteredByCount = data.map(item => item.num);
  filteredByYear = data.map(item => item.num);
  filteredByShape = data.map(item => item.num);
  filteredByColor = data.map(item => item.num);
  filteredBySize = data.map(item => item.num);
  filteredByFavorite = data.map(item => item.num);
  searchData = data.map(item => item.num);
  
  shapeBtns.forEach((item) => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });

  sizeBtns.forEach((item) => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });

  const colorChecked = Array.from(document.querySelectorAll('.color__checkbox:checked')  as NodeListOf<HTMLInputElement>);
  colorChecked.forEach((item) => {
    item.checked = false;
  });

  if (favoriteCheckbox.checked) {
    favoriteCheckbox.checked = false;
  }

  (countSlider.noUiSlider as API).reset();
  const countValues = (countSlider.noUiSlider as API).get() as string[];

  setOutput(countOutput, countValues);

  (yearSlider.noUiSlider as API).reset();
  const yearValues = (yearSlider.noUiSlider as API).get() as string[];

  setOutput(yearOutput, yearValues);

  searchInput.value='';
  filter();
}

resetFiltersBtn.addEventListener('click', resetFilters);

function resetStorage(): void {
  localStorage.clear();
  selectedCards.length = 0;
  selectedCountEl.textContent = '0';
  sortSelect.value = 'sort-name-max';
  resetFilters();
}

resetStorageBtn.addEventListener('click', resetStorage);

function setLocalStorage() {

  const shapeValues = shapeBtns.map(function(el) {
    return el.classList.contains('active') ? 1 : 0;
  });

  localStorage.setItem('shape', JSON.stringify(shapeValues));

  const colorValues = colorCheckboxes.map(function(el) {
    return el.checked ? 1 : 0;
  });

  localStorage.setItem('color', JSON.stringify(colorValues));

  const sizeValues = sizeBtns.map(function(el) {
    return el.classList.contains('active') ? 1 : 0;
  });

  localStorage.setItem('size', JSON.stringify(sizeValues));

  const favorite = favoriteCheckbox.checked ? 1 : 0;

  localStorage.setItem('favorite', JSON.stringify(favorite));

  const countValues = (countSlider.noUiSlider as API).get();
  localStorage.setItem('count-slider', JSON.stringify(countValues));

  const yearValues = (yearSlider.noUiSlider as API).get();
  localStorage.setItem('year-slider', JSON.stringify(yearValues));

  localStorage.setItem('sort', JSON.stringify(sortSelect.value));

  localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('shape')) {
    const shapeValues = JSON.parse(localStorage.getItem('shape') as string) || [];

    shapeValues.forEach(function(val: number, idx: number) {
      if (val === 1) {
        shapeBtns[idx].classList.add('active');
      }
    });
    filterByShape();
  }
  if (localStorage.getItem('color')) {
    const colorValues = JSON.parse(localStorage.getItem('color') as string) || [];

    colorValues.forEach(function(val: number, idx: number) {
      if (val === 1) {
        colorCheckboxes[idx].checked = true;
      }
    });
    filterByColor();
  }
  if (localStorage.getItem('size')) {
    const sizeValues = JSON.parse(localStorage.getItem('size') as string) || [];

    sizeValues.forEach(function(val: number, idx: number) {
      if (val === 1) {
        sizeBtns[idx].classList.add('active');
      }
    });
    filterBySize();
  }
  if (localStorage.getItem('favorite')) {
    const favorite = JSON.parse(localStorage.getItem('favorite') as string) || [];

    if (favorite === 1) {
      favoriteCheckbox.checked = true;
    }
    filterByFavorite();
  }
  
  if (localStorage.getItem('count-slider')) {
    const countValues = JSON.parse(localStorage.getItem('count-slider') as string) || [];
    (countSlider.noUiSlider as API).set([countValues[0], countValues[1]]);
    setOutput(countOutput, countValues);
  }

  if (localStorage.getItem('year-slider')) {
    const yearValues = JSON.parse(localStorage.getItem('year-slider') as string) || [];
    (yearSlider.noUiSlider as API).set([yearValues[0], yearValues[1]]);
    setOutput(yearOutput, yearValues);
  }

  if (localStorage.getItem('sort')) {
    const sort = JSON.parse(localStorage.getItem('sort') as string) || [];
    sortSelect.value = sort;
  }

  if (localStorage.getItem('selectedCards')) {
    selectedCards = JSON.parse(localStorage.getItem('selectedCards') as string) || [];
    console.log(selectedCards);
    selectedCountEl.textContent = selectedCards.length.toString();
  } 
  filter();
}

window.addEventListener("load", getLocalStorage);