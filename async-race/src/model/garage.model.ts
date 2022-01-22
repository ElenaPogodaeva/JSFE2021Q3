import { CarModel, Car } from "../api";

const baseUrl = 'http://127.0.0.1:3000';

const path = {    //enum
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
}

export default class Garage {
  public _cars: CarModel[];
  private count: number;

  //this.garageElement = document.getElementById('garage-view') as HTMLElement;

  selectedCarId: string;
  car: CarModel;
  constructor() {
    this._cars = [];
    this.count = 0;

    this.selectedCarId = '';
    this.car = {id: 0, name: '', color: ''};
  }

  async fetchCars (page: number, limit = 7) {
    const response = await fetch(`${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`);
    const items = await response.json();

    const count = Number(response.headers.get('X-Total-Count'));

    this._cars = items;
    this.count = count;
  }

  async deleteCar(id: number) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'DELETE'
    });
    const car = await response.json();

    return car;
  }

  getCars() {
    return this._cars;
  }

  getCount() {
    return this.count;
  }

  async getCar (id: number) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const car = await response.json();
    this.car = car;
    return this.car;
  }

  async createCar (body: Car) {
    const response = await fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const car = await response.json();

    this.car = car;
    return this.car;
  }

  async updateCar (id: number, body: Car) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const car = await response.json();

    this.car = car;
    return this.car;
  }


  async updateGarage (page: number) {
    await this.fetchCars(page);
    console.log(this.count);
    if (page * 7 < this.count) {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled = false;
    }
    else {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled = true;
    }

    if (page > 1) {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled = false;
    }
    else {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled = true;
    }
  }

  async selectCar(e: Event) {
    if ((e.target as HTMLElement).classList.contains('select-button')) {
      this.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
      const selectedCar = await this.getCar(+this.selectedCarId);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
      (document.getElementById('update-name') as HTMLInputElement).disabled = false;
      (document.getElementById('update-color') as HTMLInputElement).disabled = false;
      (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
    }
    /*
    if ((e.target as HTMLElement).classList.contains('remove-button')) {
      this.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
      await deleteCar(+this.selectedCarId);
      await updateGarage();
      const garage = document.getElementById('garage') as HTMLElement;
      garage.innerHTML = renderGarage();
    } */
  }
}

