import data from './data';
import {Toy} from './types';

let selectedCards:string[] = [];
let selectedCount:number = 0;
const maxSelectCount = 20;
const cardsContainer = document.querySelector(".cards") as HTMLElement;
const sortSelect = document.querySelector(".sort__select") as HTMLElement;

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
      
      console.log(cardNum);
      selectedCards.push(cardNum);
      card.classList.add('active');

      console.log(selectedCards);
    }
    else if (!card.classList.contains('active') && (selectedCards.length === maxSelectCount)) {
      
    }
    else {
      console.log(cardNum);
      console.log(selectedCards.indexOf(cardNum));
      selectedCards.splice(selectedCards.indexOf(cardNum), 1);
      console.log(selectedCards);
      card.classList.remove('active');
    }
    selectedCount = selectedCards.length;
    selectedCountEl.textContent = selectedCount.toString();
  }
}

cardsContainer.addEventListener('click', (e: Event) => addCard(e));


