import data from './data';
import {Toy} from './types';


const cardsContainer = document.querySelector(".cards") as HTMLElement;


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

