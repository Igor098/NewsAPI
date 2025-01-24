export interface INewsItemProps {
    title: string;
    description: string;
    url: string;
}

export interface INewsItemSource {
    id: string;
    name: string;
    articles: Array<INewsItemState>;
}

export interface INewsItemState {
    source: INewsItemSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IStore {
    news: INewsItemState;
    favouriteNews: INewsItemState;
}