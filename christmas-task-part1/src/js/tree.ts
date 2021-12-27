import data from './data';
import { Toy } from './types';

const treeContainer = document.querySelector('.tree-container') as HTMLElement;
const bgContainer = document.querySelector('.bg-container') as HTMLElement;
const mainTreeContainer = document.querySelector('.main-tree-container') as HTMLElement;
const mainTree = document.querySelector('.main-tree') as HTMLImageElement;
const garlandContainer = document.querySelector('.garland-tree-container') as HTMLImageElement;
const snow = document.querySelector('.snow') as HTMLImageElement;
//const garlandBtns = document.querySelector('.garland-btns') as HTMLElement;
const switchGarlandCheckbox = document.getElementById('switch-garland') as HTMLInputElement;
const garlandBtns = Array.from(document.querySelectorAll('.garland-radio') as NodeListOf<HTMLInputElement>);

let isGarlandOn = false;
let garlandColor: string;

function setTree(e: Event): void {

  if ((e.target as HTMLElement).classList.contains('tree')) {
    const treeNum = (e.target as HTMLElement).dataset.tree;
    console.log(treeNum);
    mainTree.src=`./assets/tree/${treeNum}.png`;
  }
}

treeContainer.addEventListener('click', (e: Event) => setTree(e));

function setBg(e: Event): void {

  if ((e.target as HTMLElement).classList.contains('bg')) {
    const bgNum = (e.target as HTMLElement).dataset.bg;
    mainTreeContainer.style.backgroundImage = `url("./assets/bg/${bgNum}.jpg")`;
    console.log(bgNum)
  }
}

bgContainer.addEventListener('click', (e: Event) => setBg(e));


function addGarland(): void {
  var startAngle = Math.PI / 10,
  angle = startAngle / 2,
  radius = 100,
  offset = 500 / 2;
 /* addGarlandRow(480, 15, 10, 20);
  addGarlandRow(460, 35, 20, 20);
  addGarlandRow(435, 55, 30, 20);
  addGarlandRow(400, 90, 40, 20);*/
  addGarlandRow(480, 15, 8, 20);
  addGarlandRow(450, 45, 18, 20);
  addGarlandRow(400, 95, 28, 20);
  addGarlandRow(380, 115, 38, 20);
  addGarlandRow(320, 175, 48, 20);
  addGarlandRow(280, 215, 58, 20);

}
//addGarland();

function addGarlandRow(right:number, left:number, bottom:number, length:number): void {
  var startAngle = Math.PI / 10,
  //angle = startAngle / 2,
  radius = 100,
  offset = 500 / 2;

  const ul = document.createElement('ul');
  ul.classList.add('lightrope');
  let width = (right - left)*2;
  let count = width/30;
  let angle = 60 / count;
  let rotate = 60;
  ul.style.width = `${width}px`;
  ul.style.height = `${width}px`;
  ul.style.bottom = `${bottom}%`;//'555px';
  garlandContainer.appendChild(ul);
  
  
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
   // li.style.left = radius * Math.cos( angle ) + offset + "px";
   // li.style.top = radius * Math.sin( angle ) + "px";
     li.classList.add(`${garlandColor}`);
  //  angle += startAngle;
   
    ul.appendChild(li);
    
   // li.style.transform = `translate(${x}px)`;
    li.style.transform = `rotate(${rotate}deg) translate(${Math.round(width/2 - 10)}px) rotate(-${rotate}deg)`;
   // x +=30;
   //rotate+=4;
   rotate = rotate + angle;
  }
}

function changeGarlandColor(): void {
  isGarlandOn = true;
  garlandContainer.innerHTML = '';
  switchGarlandCheckbox.checked=true;

  const colorChecked = document.querySelector('.garland-radio:checked') as HTMLInputElement;
  //if ((e.target as HTMLElement).classList.contains('garland-btn')) {
    console.log(colorChecked);
   // color = (e.target as HTMLElement).dataset.color as string;
   garlandColor = colorChecked.value;
    console.log(garlandColor);
  //  mainTree.src=`./assets/tree/${treeNum}.png`;
  addGarland();
    
 // }

}

garlandBtns.forEach(item => item.addEventListener('click',changeGarlandColor));

function removeGarland(): void {
  garlandContainer.innerHTML = '';
  //isGarlandOn = false;
  switchGarlandCheckbox.checked=false;
}

function switchGarland(): void {
  isGarlandOn = switchGarlandCheckbox.checked;
  isGarlandOn ? addGarland() : removeGarland();
}

switchGarlandCheckbox.addEventListener('change', switchGarland);
