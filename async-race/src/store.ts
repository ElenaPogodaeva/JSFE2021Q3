import { getCars } from './api';

const { items: cars, count: carsCount } = await getCars(1);

export default {
  carsPage: 1,
  cars,
  carsCount,
  view: 'garage',
  winnersPage: 1,
};
