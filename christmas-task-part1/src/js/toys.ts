import data from './data';
import {Toy} from './types';
import noUiSlider, {target, API} from 'nouislider';

let selectedCards:string[] = [];
let selectedCount:number = 0;
const maxSelectCount = 20;
const cardsContainer = document.querySelector(".cards") as HTMLElement;
const sortSelect = document.querySelector(".sort__select") as HTMLElement;
const shapeContainer = document.querySelector(".shape") as HTMLElement;

let filteredByCount:string[] = data.map(item => item.num);
let filteredByYear:string[] = data.map(item => item.num);
let filteredByShape:string[] = data.map(item => item.num);


function drawCards(data: Toy[]): void {
  cardsContainer.innerHTML = '';
  data.forEach((item) => {
    let card = '';
    const src = `../assets/toys/${item.num}.png`;
    card = `<div class="card" data-num = ${item.num}>
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
drawCards(data);

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

function sortCards(e: Event): void {
  const value = (e.target as HTMLSelectElement).value;
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

sortSelect.addEventListener('change', (e: Event) => sortCards(e));

function sortByName() {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByYear() {
  return data.sort((a, b) => +a.year - +b.year);
}

const countSlider = document.querySelector('.count__slider')  as target;
const yearSlider = document.querySelector('.year__slider')  as target;

const countOutput0 = document.getElementById('count-output-0') as HTMLOutputElement;
const countOutput1  = document.getElementById('count-output-1') as HTMLOutputElement;
const countOutput = [countOutput0, countOutput1];
const yearOutput0 = document.getElementById('year-output-0') as HTMLOutputElement;
const yearOutput1  = document.getElementById('year-output-1') as HTMLOutputElement;
const yearOutput = [yearOutput0, yearOutput1];

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
  console.log(filteredByCount);
  console.log(filteredByYear);
  let filteredData = data.filter(item => filteredByCount.includes(item.num) && filteredByYear.includes(item.num) &&
  filteredByShape.includes(item.num));
 // console.log(data)
  drawCards(filteredData);
}

(countSlider.noUiSlider as API).on('slide', function (values, handle) { 

  let minCount = Math.round(+values[0]);
  let maxCount = Math.round(+values[1]);
  countOutput[handle].value = Math.round(+values[handle]).toString();
  filteredByCount = data.filter(item => (minCount <= +item.count) && (+item.count <= maxCount))
  .map(item => item.num);

  filter();
 // drawCards(filteredByCount);
});

(yearSlider.noUiSlider as API).on('slide', function (values, handle) { 
  
  let minYear = Math.round(+values[0]);
  let maxYear = Math.round(+values[1]);
  
  yearOutput[handle].value = Math.round(+values[handle]).toString();
  filteredByYear = data.filter(item => (minYear <= +item.year) && (+item.year <= maxYear))
  .map(item => item.num);

  filter();
 // drawCards(filteredByYear);
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
  }
}

shapeContainer.addEventListener('click', (e: Event) => filterByShape(e));