import { getCars } from './api'

const {items: cars, count: carsCount} = await getCars(1);


export default {
  carsPage: 1,
  cars,
  carsCount,
  view: 'garage',
  winnersPage: 1,
}
/*
const main = async () => {
  const {items: cars, count: carsCount} = await getCars([{key: '_page', value: 1}, {key: '_limit', value: 4}]);
  const cars = obj.items;
  return cars;
}
*/
