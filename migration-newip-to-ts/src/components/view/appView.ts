import News from './news/news';
import Sources from './sources/sources';
import { IData, IDataArticle, IDataSource } from '../types';

export class AppView {
  news: News;

  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IData) {
    const values: IDataArticle[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IData) {
    const values: IDataSource[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
