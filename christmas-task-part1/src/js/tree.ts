import data from './data';
import { Toy } from './types';

const treeContainer = document.querySelector('.tree-container') as HTMLElement;
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


