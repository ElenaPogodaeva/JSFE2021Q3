import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'bebcc0c0bf374412acfa48fb911daffd', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
