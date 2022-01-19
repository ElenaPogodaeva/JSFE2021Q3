const names = ['Camry', 'Cayenne', 'Combi', '7', '9'];
const models = ['Tesla', 'BMW', 'Mersedes', 'Ford'];
const letters = '0123456789ABCDEF';

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
}

const getRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

export const getRandomCars = (count = 100) => {
  let cars = new Array(count).fill(0);
  return cars.map((item) => ({name: getRandomName(), color: getRandomColor()}));
}
