import {render} from './pages/garage/garage';
import { getCars, getCar, createCar, updateCar, deleteCar, updateGarage} from './api'

import { renderGarage} from './pages/garage/garage';
import store from './store';


render();
await updateGarage();


const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;

const nextBtnClick = async () => {
  if (store.view === 'garage') {
    store.carsPage += 1;
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLElement;

    garage.innerHTML = renderGarage();
  }
}

const prevBtnClick = async () => {
  if (store.view === 'garage') {
    store.carsPage -= 1;
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLElement;

    garage.innerHTML = renderGarage();
  }
}
nextBtn.addEventListener('click', nextBtnClick);
prevBtn.addEventListener('click', prevBtnClick);



  //console.log(createForm);
/*import image from './images/lazy.png';

const createImage = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render(); */
