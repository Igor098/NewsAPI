export interface INewsItemProps {
    title: string;
    description: string | null;
    url: string;
}

export interface INewsItemSource {
    totalArticles: 54904;
    articles: Array<INewsItemState>;
}

export interface INewsItemState {
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string,
        url: string
    };
}

export interface INewsState {
    articles: Array<INewsItemState>;
    searchResults: Array<INewsItemState>;
    loading: boolean;
    error: string | null;
    category: string;
    searchQuery: string;
}

export interface IFavouritesNewsState {
    articles: Array<INewsItemState>;
}

export interface IRegisterModel {
    email: string;
    password: string;
    username: string;
    confirm_password: string;
}

export interface IAuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    username: string | null;
    loading: boolean;
    error: string | null,
}