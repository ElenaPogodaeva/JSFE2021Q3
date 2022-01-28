import App from './controller/app';
import View from './view/app.view';
import Garage from './model/garage.model';
import Winners from './model/winners.model';

const garage = new Garage();
const winners = new Winners();
const view = new View(garage, winners);

const app = new App(garage, winners, view);
app.start();
