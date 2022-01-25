const names = [
  'Camry',
  'Cayenne',
  'Combi',
  '7',
  '9',
  'Corsa',
  'M8',
  'A4',
  'Jetta',
  'Model S',
];
const models = [
  'Tesla',
  'BMW',
  'Mersedes',
  'Ford',
  'Zhiguli',
  'Moskvich',
  'Toyota',
  'Porsche',
  'Volkswagen',
  'Lada',
];
const letters = '0123456789ABCDEF';

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export const getRandomCars = (count = 100) => {
  const cars = new Array(count).fill(0);
  return cars.map((item) => ({
    name: getRandomName(),
    color: getRandomColor(),
  }));
};

function getCenterPoint(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const centerA = getCenterPoint(a);
  const centerB = getCenterPoint(b);

  const distanceSquared =
    Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2);

  return Math.sqrt(distanceSquared);
}

export function animation(
  car: HTMLElement,
  distance: number,
  animationTime: number
) {
  let start: number | null = null;
  const state = { id: 1 };

  function getStep(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = window.requestAnimationFrame(getStep);
    }
  }
  state.id = window.requestAnimationFrame(getStep);
  return state;
}
