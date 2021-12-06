export interface IDataSource {
  id: string | null;
  name: string;
}

export interface IDataArticle {
  source: IDataSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface IData {
  articles?: Array<IDataArticle>;
  sources?: Array<IDataSource>;
}

export type Options = {
  [key: string]: string;
};

export type Callback = <T>(data: T) => void;
