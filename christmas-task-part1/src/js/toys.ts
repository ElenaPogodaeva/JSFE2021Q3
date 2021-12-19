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
const resetBtn = document.querySelector(".reset") as HTMLElement;
const searchInput = document.querySelector(".search") as HTMLInputElement;
const colorCheckboxes =  Array.from(document.querySelectorAll('input.color__checkbox') as NodeListOf<HTMLInputElement>);
const shapeBtns = Array.from(document.querySelectorAll('.shape__btn')  as NodeListOf<HTMLElement>);
const sizeBtns = Array.from(document.querySelectorAll('.size__btn')  as NodeListOf<HTMLElement>);


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
  const selectedCountEl = document.querySelector(".select span") as HTMLElement;
  const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
  if (card) {
    cardNum = card.dataset.num as string;
    if (!card.classList.contains('active') && (selectedCards.length < maxSelectCount)) {

      selectedCards.push(cardNum);
      card.classList.add('active');
    }
    else if (!card.classList.contains('active') && (selectedCards.length === maxSelectCount)) {
      //popup
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

(countSlider.noUiSlider as API).on('slide', function (values, handle) { 

  let minCount = Math.round(+values[0]);
  let maxCount = Math.round(+values[1]);
  setOutput(countOutput, values);
  //countOutput[handle].value = Math.round(+values[handle]).toString();
  filteredByCount = data.filter(item => (minCount <= +item.count) && (+item.count <= maxCount))
  .map(item => item.num);
  filter();
});

(yearSlider.noUiSlider as API).on('slide', function (values, handle) { 
  
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


function filterByShape(e: Event) {

  if ((e.target as HTMLElement).classList.contains('shape__btn')) {
    const shapeBtn = e.target as HTMLElement;
    if (!shapeBtn.classList.contains('active')) {
      shapeBtn.classList.add('active');
    }
    else {
      shapeBtn.classList.remove('active');
    }
    const shapeBtns = Array.from(document.querySelectorAll('.shape__btn.active')  as NodeListOf<HTMLElement>);
    const shapeArr = shapeBtns.map(item => item.dataset.shape);
    console.log(shapeArr);
    if (shapeArr.length !== 0) {
      filteredByShape = data.filter(item => shapeArr.includes(item.shape)).map(item => item.num);
    }
    else {
      filteredByShape = data.map(item => item.num);
    }
    filter();
   // setLocalStorage();
  }
}

shapeContainer.addEventListener('click', (e: Event) => filterByShape(e));

function filterByColor() {
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
  console.log('changed');
 // setLocalStorage();
}

colorCheckboxes.forEach(item => item.addEventListener('change', filterByColor));

function filterBySize(e: Event) {

  if ((e.target as HTMLElement).classList.contains('size__btn')) {
    const sizeBtn = e.target as HTMLElement;
   // if (!sizeBtn.classList.contains('active')) {
    //  sizeBtn.classList.add('active');
   // }
    //else {
   //  sizeBtn.classList.remove('active');
   // }
    sizeBtn.classList.toggle('active');
    const sizeBtns = Array.from(document.querySelectorAll('.size__btn.active')  as NodeListOf<HTMLElement>);
    const sizeArr = sizeBtns.map(item => item.dataset.size);
    console.log(sizeArr);
    if (sizeArr.length !== 0) {
      filteredBySize = data.filter(item => sizeArr.includes(item.size)).map(item => item.num);
    }
    else {
      filteredBySize = data.map(item => item.num);
    }
    filter();
   // setLocalStorage();
  }
}

sizeContainer.addEventListener('click', (e: Event) => filterBySize(e));

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
 // filteredData = data.slice();
 // sortCards();
 // drawCards(filteredData);
  filter();

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
}

resetBtn.addEventListener('click', resetFilters);


