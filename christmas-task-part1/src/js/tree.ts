import data from './data';
import { Toy } from './types';
import { selectedCards } from './toys';

const startPage = document.querySelector('.start-page') as HTMLElement;
const treePage = document.querySelector('.tree-page') as HTMLElement;
const toysPage = document.querySelector('.main-page') as HTMLElement;

const startBtn = document.querySelector('#start-game') as HTMLElement;

const treeContainer = document.querySelector('.tree-container') as HTMLElement;
const bgContainer = document.querySelector('.bg-container') as HTMLElement;

const mainTreeContainer = document.querySelector('.main-tree-container') as HTMLElement;
const mainTree = document.querySelector('.main-tree') as HTMLImageElement;
const garlandContainer = document.querySelector('.garland-tree-container') as HTMLImageElement;
const bgItems = Array.from(document.querySelectorAll('.bg') as NodeListOf<HTMLElement>);
const treeItems = Array.from(document.querySelectorAll('.tree') as NodeListOf<HTMLElement>);

const area = document.querySelector('area') as HTMLElement;
const snow = document.querySelector('.snow') as HTMLImageElement;
const snowContainer = document.querySelector('.snow-container') as HTMLElement;
//const garlandBtns = document.querySelector('.garland-btns') as HTMLElement;
const switchGarlandCheckbox = document.getElementById('switch-garland') as HTMLInputElement;
const garlandBtns = Array.from(document.querySelectorAll('.garland-radio') as NodeListOf<HTMLInputElement>);
const audioBtn = document.querySelector('.audio') as HTMLElement;
const resetStorageBtn = document.getElementById('reset-tree-storage') as HTMLElement;

const toysLink = document.querySelector('#switch-toys-page') as HTMLElement;
const treeLink = document.querySelector('#switch-tree-page') as HTMLElement;
const homeLink = document.querySelector('#switch-start-page') as HTMLElement;

let isGarlandOn = false;
let isPlay = false;
let isSnow = false;
let garlandColor: string;
let timerId: NodeJS.Timer; //ReturnType<typeof setInterval>;

function setTree(e: Event): void {
  if ((e.target as HTMLElement).classList.contains('tree')) {
    treeItems.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    const treeNum = (e.target as HTMLElement).dataset.tree;

    mainTree.src = `./assets/tree/${treeNum}.png`;

    (e.target as HTMLElement).classList.add('active');
  }
}

treeContainer.addEventListener('click', (e: Event) => setTree(e));

function setBg(e: Event): void {
  if ((e.target as HTMLElement).classList.contains('bg')) {
    bgItems.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    const bgNum = (e.target as HTMLElement).dataset.bg;
    mainTreeContainer.style.backgroundImage = `url("./assets/bg/${bgNum}.jpg")`;

    (e.target as HTMLElement).classList.add('active');
  }
}

bgContainer.addEventListener('click', (e: Event) => setBg(e));

const audio = new Audio();

function toggleAudioBtn() {
  if (isPlay) {
    audioBtn.classList.add('play');
  } else {
    audioBtn.classList.remove('play');
  }
}

function playAudio() {
  audio.src = './assets/audio/audio.mp3';
  audio.currentTime = 0;
  audio.play();
}

function togglePlayAudio() {
  if (!isPlay) {
    playAudio();
    isPlay = true;
    //treePage.removeEventListener('click', playAudio);
  } else {
    audio.pause();
    isPlay = false;
  }
  // audioBtn.classList.toggle('play');
  toggleAudioBtn();
}

audioBtn.addEventListener('click', togglePlayAudio);

function createSnowFlake() {
  const snowFlake = document.createElement('div');
  snowFlake.classList.add('fas');
  snowFlake.classList.add('fa-snowflake');
  snowFlake.style.left = Math.random() * snowContainer.clientWidth + 'px'; //window.innerWidth
  snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
  snowFlake.style.opacity = Math.random().toString();
  //snow_flake.style.fontSize = Math.random() * 10 + 10 + 'px';
  snowFlake.style.width = Math.random() * 10 + 12 + 'px';
  snowFlake.style.height = snowFlake.style.width;
  snowContainer.appendChild(snowFlake);

  setTimeout(() => {
    snowFlake.remove();
  }, 5000);
}

function createSnow() {
  if (!isSnow) {
    timerId = setInterval(createSnowFlake, 50);
    isSnow = true;
    snowContainer.style.display = 'block';
    snow.classList.add('play');
  } else {
    clearInterval(timerId);
    isSnow = false;
    snowContainer.style.display = 'none';
    snow.classList.remove('play');
  }
}

snow.addEventListener('click', createSnow);

function addGarlandRow(right: number, left: number, bottom: number): void {
  const ul = document.createElement('ul');
  ul.classList.add('lightrope');
  const width = (right - left) * 2;
  const count = width / 30;
  const angle = 60 / count;
  let rotate = 60;
  ul.style.width = `${width}px`;
  ul.style.height = `${width}px`;
  ul.style.bottom = `${bottom}%`; //'555px';
  garlandContainer.appendChild(ul);

  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    // li.style.left = radius * Math.cos( angle ) + offset + "px";
    // li.style.top = radius * Math.sin( angle ) + "px";
    li.classList.add(`${garlandColor}`);
    //  angle += startAngle;

    ul.appendChild(li);

    // li.style.transform = `translate(${x}px)`;
    li.style.transform = `rotate(${rotate}deg) translate(${Math.round(width / 2 - 10)}px) rotate(-${rotate}deg)`;
    // x +=30;
    //rotate+=4;
    rotate = rotate + angle;
  }
}

function addGarland(): void {
  addGarlandRow(460, 35, 20);
  addGarlandRow(430, 65, 30);
  addGarlandRow(400, 95, 40);
  addGarlandRow(370, 125, 50);
  addGarlandRow(340, 155, 60);
  addGarlandRow(310, 185, 70);
}

function changeGarlandColor(): void {
  isGarlandOn = true;
  garlandContainer.innerHTML = '';
  switchGarlandCheckbox.checked = true;

  const colorChecked = document.querySelector('.garland-radio:checked') as HTMLInputElement;

  garlandColor = colorChecked.value;
  addGarland();
}

garlandBtns.forEach((item) => item.addEventListener('click', changeGarlandColor));

function removeGarland(): void {
  garlandContainer.innerHTML = '';
  //isGarlandOn = false;
  switchGarlandCheckbox.checked = false;
}

function switchGarland(): void {
  isGarlandOn = switchGarlandCheckbox.checked;
  if (isGarlandOn) {
    addGarland();
  } else {
    removeGarland();
  }
  // isGarlandOn ? addGarland() : removeGarland();
}

switchGarlandCheckbox.addEventListener('change', switchGarland);

const cardsContainer = document.querySelector('.selected-cards') as HTMLElement;

function drawSelectedCard(item: Toy): string {
  let card = '';
  const src = `./assets/toys/${item.num}.png`;
  let img = '';
  for (let i = 1; i <= +item.count; i++) {
    img += `<img src=${src} alt="card" class="selected-card__img" alt="card" draggable="true" id = ${item.num}-${i} data-imgnum=${item.num}>`;
  }
  card = `<div class="selected-card" data-num=${item.num}>
              <p class="selected-count">${item.count}</p>
              ${img}
            </div>`;
  return card;
}

function drawSelectedCards(): void {
  cardsContainer.innerHTML = '';
  const selectedData = selectedCards.length
    ? data.filter((item) => selectedCards.includes(item.num))
    : data.filter((item) => +item.num <= 20);

  // dataArr = data.filter((item) => +item.num <= 20);
  selectedData.forEach((item) => {
    const card = drawSelectedCard(item);
    //cardsContainer.innerHTML+=card;
    cardsContainer.insertAdjacentHTML('beforeend', card);
  });
}

//let selectedData:Toy[];
//selectedData = data.filter((item) => +item.num < 20);

drawSelectedCards();

let draggable = document.querySelectorAll('[draggable]') as NodeListOf<HTMLElement>;

let shiftX: number, shiftY: number;

function handleDragStart(e: DragEvent) {
  (e.dataTransfer as DataTransfer).setData('text', (e.target as HTMLElement).id);
  shiftX = e.clientX - (e.target as HTMLElement).getBoundingClientRect().left;
  shiftY = e.clientY - (e.target as HTMLElement).getBoundingClientRect().top;
}

function calcCount(parentNode: HTMLElement) {
  const imgArr = parentNode.querySelectorAll('img') as NodeListOf<HTMLElement>;
  const count = imgArr.length;
  const selectedCount = parentNode.querySelector('.selected-count') as HTMLElement;
  selectedCount.textContent = count.toString();
}

let isDrop = false;

function handleOverDrop(e: DragEvent) {
  e.preventDefault();
  if (e.type != 'drop') {
    isDrop = false;
    return;
  }

  isDrop = true;
  const draggedId = (e.dataTransfer as DataTransfer).getData('text');

  const draggedEl = document.getElementById(draggedId) as HTMLElement;

  const parentCard = document.querySelector(`.selected-card[data-num='${draggedEl.dataset.imgnum}']`) as HTMLElement;

  if (draggedEl.parentNode !== e.target) {
    (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);
    area.appendChild(draggedEl);
    calcCount(parentCard);
  }

  draggedEl.style.position = 'absolute';

  draggedEl.style.left = `${
    ((e.clientX - mainTreeContainer.getBoundingClientRect().left - shiftX) / mainTreeContainer.clientWidth) * 100
  }%`;

  draggedEl.style.top = `${
    ((e.clientY - mainTreeContainer.getBoundingClientRect().top - shiftY) / mainTreeContainer.clientHeight) * 100
  }%`; //`${e.clientY - mainTreeContainer.getBoundingClientRect().top - shiftY}px`; //`${e.pageY - shiftX}px`;
}

area.addEventListener('drop', function (e: DragEvent) {
  handleOverDrop(e);
});
area.addEventListener('dragover', function (e: DragEvent) {
  handleOverDrop(e);
});

function handleDragEnd(e: DragEvent) {
  e.preventDefault();

  if (isDrop) {
    return;
  }

  const draggedId = (e.target as HTMLElement).id;

  const draggedEl = document.getElementById(draggedId) as HTMLElement;

  (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);
  const parentCard = document.querySelector(`.selected-card[data-num='${draggedEl.dataset.imgnum}']`) as HTMLElement;

  parentCard.appendChild(draggedEl);
  //draggedEl.style.position = "absolute";
  // draggedEl.style.left = `${e.clientX - - shiftX}px`; // shiftX
  draggedEl.style.left = 'auto'; // shiftX

  draggedEl.style.top = 'auto';

  calcCount(parentCard);
}

for (let i = 0; i < draggable.length; i++) {
  draggable[i].addEventListener('dragstart', (e: DragEvent) => {
    handleDragStart(e);
  });
  draggable[i].addEventListener('dragend', (e: DragEvent) => {
    handleDragEnd(e);
  });
}

function setLocalStorage() {
  const selectedBg = document.querySelector('.bg.active') as HTMLElement;
  const bg = selectedBg.dataset.bg;

  localStorage.setItem('bg', JSON.stringify(bg));

  const selectedTree = document.querySelector('.tree.active') as HTMLElement;
  const tree = selectedTree.dataset.tree;

  localStorage.setItem('tree', JSON.stringify(tree));

  const checkedGarland = document.querySelector('input[name="garland"]:checked') as HTMLInputElement;

  localStorage.setItem('garland-color', JSON.stringify(checkedGarland.value));

  //const isGarland = switchGarlandCheckbox.checked ? 1 : 0;

  localStorage.setItem('isGarland', JSON.stringify(switchGarlandCheckbox.checked));

  localStorage.setItem('isPlay', JSON.stringify(isPlay));
  localStorage.setItem('isSnow', JSON.stringify(isSnow));
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('bg')) {
    const bgNum = JSON.parse(localStorage.getItem('bg') as string) || [];

    const bgItem = document.querySelector(`.bg[data-bg="${bgNum}"]`) as HTMLElement;
    bgItems[0].classList.remove('active');
    bgItem.classList.add('active');
    mainTreeContainer.style.backgroundImage = `url("./assets/bg/${bgNum}.jpg")`;
  }

  if (localStorage.getItem('tree')) {
    const treeNum = JSON.parse(localStorage.getItem('tree') as string) || [];

    const treeItem = document.querySelector(`.tree[data-tree="${treeNum}"]`) as HTMLElement;

    treeItems[0].classList.remove('active');
    treeItem.classList.add('active');
    mainTree.src = `./assets/tree/${treeNum}.png`;
  }

  if (localStorage.getItem('garland-color')) {
    garlandColor = JSON.parse(localStorage.getItem('garland-color') as string) || [];

    const garlandItem = document.querySelector(`input[name="garland"][value="${garlandColor}"]`) as HTMLInputElement;
    garlandItem.checked = true;
  }

  if (localStorage.getItem('isGarland')) {
    const isGarland = JSON.parse(localStorage.getItem('isGarland') as string) || [];

    if (isGarland === true) {
      switchGarlandCheckbox.checked = true;
      switchGarland();
    }
  }
  if (localStorage.getItem('isPlay')) {
    isPlay = !!JSON.parse(localStorage.getItem('isPlay') as string);

    if (isPlay) {
      treePage.addEventListener(
        'click',
        () => {
          playAudio();
          toggleAudioBtn();
        },
        { once: true }
      );
    }
  }

  if (localStorage.getItem('isSnow')) {
    isSnow = !!JSON.parse(localStorage.getItem('isSnow') as string);

    if (isSnow) {
      timerId = setInterval(createSnowFlake, 50);
      // toggleSnowBtn();
      snow.classList.add('play');
    }
  }

  drawSelectedCards();
}

window.addEventListener('load', getLocalStorage);

function resetSettings(): void {
  isPlay = false;
  isSnow = false;

  audioBtn.classList.remove('play');
  audio.pause();

  snow.classList.remove('play');
  clearInterval(timerId);

  treeItems.forEach((item) => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });

  treeItems[0].classList.add('active');
  const treeNum = treeItems[0].dataset.tree;
  mainTree.src = `./assets/tree/${treeNum}.png`;

  bgItems.forEach((item) => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });

  bgItems[0].classList.add('active');
  const bgNum = bgItems[0].dataset.bg;
  mainTreeContainer.style.backgroundImage = `url("./assets/bg/${bgNum}.jpg")`;

  garlandBtns[0].checked = true;
  garlandColor = garlandBtns[0].value;
  removeGarland();

  localStorage.clear();
}

resetStorageBtn.addEventListener('click', resetSettings);

function switchToStartPage() {
  startPage.classList.remove('hide');
  treePage.classList.add('hide');
  toysPage.classList.add('hide');
}

function switchToTreePage() {
  treePage.classList.remove('hide');
  startPage.classList.add('hide');
  toysPage.classList.add('hide');
}

function switchToToysPage() {
  toysPage.classList.remove('hide');
  startPage.classList.add('hide');
  treePage.classList.add('hide');
}

toysLink.addEventListener('click', switchToToysPage);
treeLink.addEventListener('click', () => {
  drawSelectedCards();
  switchToTreePage();

  draggable = document.querySelectorAll('[draggable]') as NodeListOf<HTMLElement>;

  for (let i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener('dragstart', (e: DragEvent) => {
      handleDragStart(e);
    });
    draggable[i].addEventListener('dragend', (e: DragEvent) => {
      handleDragEnd(e);
    });
  }

  while (area.firstChild) {
    area.firstChild.remove();
  }
});

startBtn.addEventListener('click', switchToToysPage);

homeLink.addEventListener('click', switchToStartPage);
