export interface INewsItemProps {
    title: string;
    description: string | null;
    url: string;
}

export interface INewsItemSource {
    totalArticles: number;
    articles: Array<INewsItemApiState>;
}

export interface INewsItemApiState {
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

export interface INewsItemState {
    id: string;
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
    newsArticles: Array<INewsItemState>;
    searchResults: Array<INewsItemState>;
    loading: boolean;
    newsError: string | null;
    category: string;
}

export interface IFavouritesNewsState {
    articles: Array<INewsItemState>;
    loading: boolean;
    error: string | null;
}

export interface IRegisterModel {
    email: string;
    password: string;
    username: string;
    confirm_password: string;
}

export interface ILoginModel {
    email: string;
    password: string;
}

export interface IAuthState {
    isAuthenticated: boolean;
    username: string | null;
    email: string | null;
    role_name: string | null;
    loading: boolean;
    error: string | null,
}

export interface IUserModel {
    email: string;
    username: string;
    role_name: string;
}

export interface IDeletedNews {
    id: string;
}

export interface IDropdownProps {
    mainText: string;
    elementsList: Array<string>;
    setCategory?: (e: MouseEvent, category:string) => void;
}