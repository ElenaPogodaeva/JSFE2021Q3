import store from './store';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  //enum
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

export type CarModel = {
  id: number;
  name: string;
  color: string;
};

export type Car = {
  name: string;
  color: string;
};

export type WinnerModel = {
  id: number;
  wins: number;
  time: number;
};
export type Winner = {
  wins: number;
  time: number;
};

export type CarWinner = {
  wins: number;
  time: number;
  car: CarModel;
};

export type Engine = {
  velocity: number;
  distance: number;
};

export type DriveModel = {
  success: boolean;
  id: number;
  time: number;
};

export type Race = {
  id: number;
  name: string;
  color: string;
  time: number;
};
//[{key: '', value: ''}]
/*
const generateQueryString = (queryParams = []) => queryParams.length
? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}`
: '';

export const getCars = async (queryParams) => {
  const response = await fetch(`${baseUrl}${path.garage}${generateQueryString(queryParams)}`);
  const items = await response.json();

  const count = Number(response.headers.get('X-Total-Count'));

  return {
    items, count
  }
} */

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(
    `${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`
  );
  const items = await response.json();

  const count = Number(response.headers.get('X-Total-Count'));

  return {
    items,
    count,
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const car = await response.json();

  return car;
};

export const createCar = async (body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const updateCar = async (id: number, body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const updateParamsCar = async (id: number, body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const car = await response.json();

  return car;
};

export const updateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;

  if (store.carsPage * 7 < store.carsCount) {
    (document.getElementById('next-btn') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('next-btn') as HTMLButtonElement).disabled = true;
  }

  if (store.carsPage > 1) {
    (document.getElementById('prev-btn') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('prev-btn') as HTMLButtonElement).disabled = true;
  }
};

// Engine

export const startEngine = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=started`,
    {
      method: 'PATCH',
    }
  );
  const items = await response.json();

  return items;
};

export const stopEngine = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=stopped`,
    {
      method: 'PATCH',
    }
  );
  const items = await response.json();

  return items;
};

export const driveCar = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=drive`,
    {
      method: 'PATCH',
    }
  );
  return response.status !== 200
    ? { success: false }
    : { ...(await response.json()) };
  // const items = await response.json();
};

// Winners

export const getWinners = async (
  page: number,
  limit = 7,
  sort = '',
  order = ''
) => {
  const response = await fetch(
    `${baseUrl}${path.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  const items = await response.json();

  const data = await Promise.all(
    items.map(async (winner: WinnerModel) => ({
      ...winner,
      car: await getCar(winner.id),
    }))
  );
  const count = Number(response.headers.get('X-Total-Count'));

  return {
    data,
    count,
  };
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`);
  const winner = await response.json();

  return winner;
};

export const createWinner = async (body: Winner) => {
  const response = await fetch(`${baseUrl}${path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const winner = await response.json();

  return winner;
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'DELETE',
  });
  const winner = await response.json();

  return winner;
};

export const updateWinner = async (id: number, body: Winner) => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const winner = await response.json();

  return winner;
};
//[{key: 'name', value: 'Tesla'}, {key: 'color', value: '#6c779f'}]
/*
const main = async () => {
  const cars = await getCars([{key: '_page', value: 1}, {key: '_limit', value: 2}]);

  const car = await getCar(2);


  const createdCar = await createCar({
    name: '111',
    color: "#e64566",
  });

  const updatedCar = await updateCar(5, {
    name: 'update1',
    color: "#e64566",
  });
  const updatedParamsCar = await updateParamsCar(5, {
    color: '#fff',
  });

  const deletedCar = await deleteCar(20)
  console.log(deletedCar );
}

main(); */
