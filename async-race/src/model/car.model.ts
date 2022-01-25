interface ICar {
  name: string;
  color: string;
  id: number;
}
export default class Car implements ICar {
  id: number;

  name: string;

  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
