import {render} from './pages/garage/garage';
import { getCars, getCar, createCar, updateCar, deleteCar, updateGarage} from './api'
import { getRandomCars} from './utils';
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

const createForm = document.querySelector('#create-form') as HTMLFormElement;
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //const data = new FormData(this);
    const name = (createForm.elements[0] as HTMLInputElement).value;
    const color = (createForm.elements[1] as HTMLInputElement).value;
    await createCar({name: name, color: color});
    await updateGarage();
    (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
    (document.getElementById('create-name') as HTMLInputElement).value = '';
    (document.getElementById('create-color') as HTMLInputElement).value = '';
});

const updateForm = document.getElementById('update-form') as HTMLFormElement;

let selectedId = '';

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //const data = new FormData(this);
    const name = (updateForm.elements[0] as HTMLInputElement).value;
    const color = (updateForm.elements[1] as HTMLInputElement).value;
    await updateCar(+selectedId, {name: name, color: color});
    await updateGarage();
    (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
    (document.getElementById('update-name') as HTMLInputElement).value = '';
    (document.getElementById('update-color') as HTMLInputElement).value = '';
});

document.addEventListener('click', async (e) => {
  if ((e.target as HTMLElement).classList.contains('select-button')) {
    selectedId = (e.target as HTMLElement).id.split('-')[2];
    const selectedCar = await getCar(+selectedId);
    (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
    (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
    (document.getElementById('update-name') as HTMLInputElement).disabled = false;
    (document.getElementById('update-color') as HTMLInputElement).disabled = false;
    (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
  }
  if ((e.target as HTMLElement).classList.contains('remove-button')) {
    selectedId = (e.target as HTMLElement).id.split('-')[2];
    await deleteCar(+selectedId);
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLElement;
    garage.innerHTML = renderGarage();
  }
  if ((e.target as HTMLElement).classList.contains('generate-button')) {
    const cars = getRandomCars();
    await Promise.all(cars.map(async item => await createCar(item)));
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLElement;
    garage.innerHTML = renderGarage();
  }
});
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
