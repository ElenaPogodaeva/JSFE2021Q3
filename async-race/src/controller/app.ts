import { CarModel, Car } from '../api';
import Garage from '../model/garage.model'
import View from '../view/app.view';
import { getRandomCars } from '../utils';

export default class App {
  page: number;
  garage: Garage;
  view: View;
  viewName: string;

  constructor(garage: Garage, view: View) {
    this.page = 1;
    this.garage = garage;
    this.view = view;
    this.viewName = 'garage';
  }
  async start() {
    await this.garage.fetchCars(this.page);
    const cars = this.garage.getCars();
    console.log(cars);
    this.view.render(cars, this.page);
    this.listen();
  }


  listen() {
    const createForm = document.getElementById('create-form') as HTMLFormElement;
    createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (createForm.elements[0] as HTMLInputElement).value;
    const color = (createForm.elements[1] as HTMLInputElement).value;
    await this.garage.createCar({name: name, color: color});
    await this.garage.updateGarage(this.page);
    (document.getElementById('garage') as HTMLElement).innerHTML = this.view.renderGarage(this.garage._cars, this.page);
    (document.getElementById('create-name') as HTMLInputElement).value = '';
    (document.getElementById('create-color') as HTMLInputElement).value = '';
    });

    const updateForm = document.getElementById('update-form') as HTMLFormElement;
    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      //const data = new FormData(this);
      const name = (updateForm.elements[0] as HTMLInputElement).value;
      const color = (updateForm.elements[1] as HTMLInputElement).value;
      await this.garage.updateCar(+this.garage.selectedCarId, {name: name, color: color});
      await this.garage.updateGarage(this.page);
      (document.getElementById('garage') as HTMLElement).innerHTML = this.view.renderGarage(this.garage._cars, this.page);
      (document.getElementById('update-name') as HTMLInputElement).value = '';
      (document.getElementById('update-color') as HTMLInputElement).value = '';
    });

    const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
    const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
    const nextBtnClick = async () => {
      if (this.viewName === 'garage') {
        this.page += 1;
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;

        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);
      }
    }

    const prevBtnClick = async () => {
      if (this.viewName === 'garage') {
        this.page -= 1;
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;

        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);
      }
    }

    nextBtn.addEventListener('click', nextBtnClick);
    prevBtn.addEventListener('click', prevBtnClick);


    document.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('select-button')) {
        this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
        const selectedCar = await this.garage.getCar(+this.garage.selectedCarId);
        (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
        (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
        (document.getElementById('update-name') as HTMLInputElement).disabled = false;
        (document.getElementById('update-color') as HTMLInputElement).disabled = false;
        (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
      }
      if ((e.target as HTMLElement).classList.contains('remove-button')) {
        this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
        await this.garage.deleteCar(+this.garage.selectedCarId);
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;
        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);
      }
      if ((e.target as HTMLElement).classList.contains('generate-button')) {
        const cars = getRandomCars();
        await Promise.all(cars.map(async (item: Car) => await this.garage.createCar(item)));
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;
        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);
      }
      if ((e.target as HTMLElement).classList.contains('start-engine-button')) {
        const id = (e.target as HTMLElement).id.split('-')[2];
        console.log(id);
        this.garage.startDriving(+id);
      }
      if ((e.target as HTMLElement).classList.contains('stop-engine-button')) {
        const id = (e.target as HTMLElement).id.split('-')[2];
        console.log(id);
        this.garage.stopDriving(+id);
      }

     
    });
  }
}
