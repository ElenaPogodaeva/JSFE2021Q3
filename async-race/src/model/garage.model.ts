import { CarModel, Car, Engine, DriveModel, Race } from '../api';
import { getDistanceBetweenElements, animation } from '../utils';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

const maxCarsPerPage = 7;

export default class Garage {
  public _cars: CarModel[];

  private count: number;

  carsPage: number;

  selectedCarId: string;

  car: CarModel;

  animation: { [key: number]: { id: number } };

  constructor() {
    this._cars = [];
    this.count = 0;
    this.carsPage = 1;
    this.selectedCarId = '';
    this.car = { id: 0, name: '', color: '' };
    this.animation = { 0: { id: 0 } };
  }

  async fetchCars(page: number, limit = maxCarsPerPage) {
    const response = await fetch(
      `${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`
    );
    const items = await response.json();

    const count = Number(response.headers.get('X-Total-Count'));

    this._cars = items;
    this.count = count;
  }

  async deleteCar(id: number) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'DELETE',
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

  async getCar(id: number) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const car = await response.json();
    this.car = car;
    return this.car;
  }

  async createCar(body: Car) {
    const response = await fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const car = await response.json();

    this.car = car;
    return this.car;
  }

  async updateCar(id: number, body: Car) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const car = await response.json();

    this.car = car;
    return this.car;
  }

  async updateGarage(page: number) {
    await this.fetchCars(page);

    if (page * maxCarsPerPage < this.count) {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled =
        false;
    } else {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled =
        true;
    }

    if (page > 1) {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled =
        false;
    } else {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled =
        true;
    }
  }

  async selectCar(e: Event) {
    if ((e.target as HTMLElement).classList.contains('select-button')) {
      this.selectedCarId = (e.target as HTMLElement).id.split('-')[2];
      const selectedCar = await this.getCar(+this.selectedCarId);
      (document.getElementById('update-name') as HTMLInputElement).value =
        selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value =
        selectedCar.color;
      (document.getElementById('update-name') as HTMLInputElement).disabled =
        false;
      (document.getElementById('update-color') as HTMLInputElement).disabled =
        false;
      (document.getElementById('update-submit') as HTMLInputElement).disabled =
        false;
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

  // Engine

  async startEngine(id: number): Promise<Engine> {
    const response = await fetch(
      `${baseUrl}${path.engine}?id=${id}&status=started`,
      {
        method: 'PATCH',
      }
    );

    const items = await response.json();

    return items;
  }

  async stopEngine(id: number): Promise<Engine> {
    const response = await fetch(
      `${baseUrl}${path.engine}?id=${id}&status=stopped`,
      {
        method: 'PATCH',
      }
    );
    const items = await response.json();

    return items;
  }

  async driveCar(id: number) {
    const response = await fetch(
      `${baseUrl}${path.engine}?id=${id}&status=drive`,
      {
        method: 'PATCH',
      }
    ).catch();

    return response.status !== 200
      ? { success: false }
      : { ...(await response.json()) };
    // const items = await response.json();
  }

  async startDriving(id: number): Promise<DriveModel> {
    const startButton = document.getElementById(
      `start-car-${id}`
    ) as HTMLButtonElement;
    startButton.disabled = true;

    const { velocity, distance }: Engine = await this.startEngine(id);

    startButton.classList.toggle('enabling', false);
    const time = Math.round(distance / velocity);

    const stopButton = document.getElementById(
      `stop-car-${id}`
    ) as HTMLButtonElement;
    stopButton.disabled = false;
    stopButton.classList.toggle('enabling', true);

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;

    const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) + 80;
    this.animation[id] = animation(car, htmlDistance, time);
    const { success } = await this.driveCar(id);
    if (!success) window.cancelAnimationFrame(this.animation[id].id);

    return { success, id, time };
  }

  async stopDriving(id: number) {
    const stopButton = document.getElementById(
      `stop-car-${id}`
    ) as HTMLButtonElement;
    stopButton.disabled = true;
    stopButton.classList.toggle('enabling', true);
    await this.stopEngine(id);

    stopButton.classList.toggle('enabling', false);
    const startButton = document.getElementById(
      `start-car-${id}`
    ) as HTMLButtonElement;
    startButton.disabled = false;
    startButton.classList.toggle('enabling', true);

    const car = document.getElementById(`car-${id}`) as HTMLElement;

    car.style.transform = 'translateX(0)';

    if (this.animation[id]) window.cancelAnimationFrame(this.animation[id].id);
  }

  async raceAll(
    promises: Promise<DriveModel>[],
    indexes: number[]
  ): Promise<Race> {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = indexes.findIndex((i) => i === id);
      const restPromises = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const restIndexes = [
        ...indexes.slice(0, failedIndex),
        ...indexes.slice(failedIndex + 1, indexes.length),
      ];
      return this.raceAll(restPromises, restIndexes);
    }

    const winner = this._cars.filter(
      (item: CarModel): boolean => item.id === id
    )[0];
    return {
      ...winner,
      time: +(time / 1000).toFixed(2),
    };
  }

  async race(action: { (id: number): Promise<DriveModel> }): Promise<Race> {
    const promises = this._cars.map(({ id }) => action(id));

    const winner = await this.raceAll(
      promises,
      this._cars.map((car: CarModel) => car.id)
    );
    return winner;
  }
}
