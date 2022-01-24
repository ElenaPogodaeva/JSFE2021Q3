import { CarModel, Car } from '../api';
import Garage from '../model/garage.model'
import Winners from '../model/winners.model';
import View from '../view/app.view';
import { getRandomCars } from '../utils';

export default class App {
  page: number;
  garage: Garage;
  winners: Winners;
  view: View;
  viewName: string;

  constructor(garage: Garage, winners: Winners, view: View) {
    this.page = 1;
    this.garage = garage;
    this.winners = winners
    this.view = view;
    this.viewName = 'garage';
  }
  async start() {
    await this.garage.fetchCars(1);//this.page;
    const cars = this.garage.getCars();
    await this.winners.fetchWinners({page: 1});
    const winners = this.winners.getWinners();
    console.log(winners)
    console.log(cars);
    this.view.render(cars, winners, 1);//this.page);
    this.listen();
  }


  listen() {
    const createForm = document.getElementById('create-form') as HTMLFormElement;
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (createForm.elements[0] as HTMLInputElement).value;
      const color = (createForm.elements[1] as HTMLInputElement).value;
      await this.garage.createCar({name: name, color: color});
      await this.garage.updateGarage(this.garage.carsPage);
      (document.getElementById('garage') as HTMLElement).innerHTML = String(this.view.renderGarage(this.garage._cars, this.page));
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
      await this.garage.updateGarage(this.garage.carsPage);
      (document.getElementById('garage') as HTMLElement).innerHTML = String(this.view.renderGarage(this.garage._cars, this.page));
      (document.getElementById('update-name') as HTMLInputElement).value = '';
      (document.getElementById('update-color') as HTMLInputElement).value = '';
    });

    const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
    const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;

    const nextBtnClick = async () => {
      switch (this.viewName) {
        case 'garage': {
          this.garage.carsPage += 1;
          await this.garage.updateGarage(this.garage.carsPage);
          const garage = document.getElementById('garage') as HTMLElement;

          garage.innerHTML = this.view.renderGarage(this.garage._cars, this.garage.carsPage);
          break;
        }
        case 'winners': {
          this.winners.winnersPage += 1;
          await this.winners.updateWinners();
          const winners = document.getElementById('winners-view') as HTMLElement;

          winners.innerHTML = this.view.renderWinners(this.winners.winners);
          break;
        }
      }
    }

    const prevBtnClick = async () => {
      switch (this.viewName) {
        case 'garage': {
          this.garage.carsPage -= 1;
          await this.garage.updateGarage(this.garage.carsPage);
          const garage = document.getElementById('garage') as HTMLElement;

          garage.innerHTML = this.view.renderGarage(this.garage._cars, this.garage.carsPage);

          break;
        }
        case 'winners': {
          this.winners.winnersPage -= 1;
          await this.winners.updateWinners();
          const winners = document.getElementById('winners-view') as HTMLElement;

          winners.innerHTML = this.view.renderWinners(this.winners.winners);
          break;
        }
      }
    }

    nextBtn.addEventListener('click', nextBtnClick);
    prevBtn.addEventListener('click', prevBtnClick);


    const onSelectBtnClick = async (e: Event) => {
      this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
      const selectedCar = await this.garage.getCar(+this.garage.selectedCarId);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
      (document.getElementById('update-name') as HTMLInputElement).disabled = false;
      (document.getElementById('update-color') as HTMLInputElement).disabled = false;
      (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
    }
    const onRemoveBtnClick = async (e: Event) => {
      this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
      await this.garage.deleteCar(+this.garage.selectedCarId);
      await this.garage.updateGarage(this.garage.carsPage);
      const garage = document.getElementById('garage') as HTMLElement;
      garage.innerHTML = this.view.renderGarage(this.garage._cars, this.garage.carsPage);
    }
    const onGenerateBtnClick = async () => {
      const cars = getRandomCars();
      await Promise.all(cars.map(async (item: Car) => await this.garage.createCar(item)));
      await this.garage.updateGarage(this.garage.carsPage);
      const garage = document.getElementById('garage') as HTMLElement;
      garage.innerHTML = this.view.renderGarage(this.garage._cars, this.garage.carsPage);
    }

    const onGarageBtnClick = async () => {
      const garagePage = document.getElementById('garage-view') as HTMLElement;
      const winnersPage = document.getElementById('winners-view') as HTMLElement;

      await this.garage.updateGarage(this.garage.carsPage);

      this.viewName = 'garage';

      garagePage.classList.remove('hide');
      winnersPage.classList.add('hide');
    }

    const onWinnersBtnClick = async () => {
      const garagePage = document.getElementById('garage-view') as HTMLElement;
      const winnersPage = document.getElementById('winners-view') as HTMLElement;

      await this.winners.updateWinners();

      this.viewName = 'winners';
      winnersPage.innerHTML = this.view.renderWinners(this.winners.winners);
      garagePage.classList.add('hide');
      winnersPage.classList.remove('hide');
    }

    document.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('garage-menu-button')) {
        onGarageBtnClick();
      }
      if ((e.target as HTMLElement).classList.contains('winners-menu-button')) {
        onWinnersBtnClick();
      }
      if ((e.target as HTMLElement).classList.contains('select-button')) {
        /*this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
        const selectedCar = await this.garage.getCar(+this.garage.selectedCarId);
        (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
        (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
        (document.getElementById('update-name') as HTMLInputElement).disabled = false;
        (document.getElementById('update-color') as HTMLInputElement).disabled = false;
        (document.getElementById('update-submit') as HTMLInputElement).disabled = false;*/
        onSelectBtnClick(e);
      }
      if ((e.target as HTMLElement).classList.contains('remove-button')) {
        /*
        this.garage.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
        await this.garage.deleteCar(+this.garage.selectedCarId);
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;
        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);*/
        onRemoveBtnClick(e);
      }
      if ((e.target as HTMLElement).classList.contains('generate-button')) {
        /*
        const cars = getRandomCars();
        await Promise.all(cars.map(async (item: Car) => await this.garage.createCar(item)));
        await this.garage.updateGarage(this.page);
        const garage = document.getElementById('garage') as HTMLElement;
        garage.innerHTML = this.view.renderGarage(this.garage._cars, this.page);*/
        onGenerateBtnClick();
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

      if ((e.target as HTMLElement).classList.contains('race-button')) {

        await this.garage.race(this.garage.startDriving);

      }
    });
  }
}
