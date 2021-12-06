import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '8fefef8c02fb4deaab9897adb49f47a0', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
