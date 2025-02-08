import axios from "axios";
import {IDeletedNews, ILoginModel, INewsItemState, IRegisterModel, IUserModel} from "../types/types.ts";


const REGISTER_URL = "/auth/register/";
const LOGIN_URL = "/auth/login/";
const USER_URL = "/auth/me/";
const REFRESH_URL = "/auth/refresh/";
const LOGOUT_URL = "/auth/logout/";
const GET_NEWS_URL = "/news/";
const ADD_NEWS_URL = "/news/add/";
const DELETE_NEWS_URL = "/news/delete/";

export const api = axios.create({
    baseURL: 'https://fl.greatdragonx.su:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Включает автоматическую передачу cookies
});

api.interceptors.response.use(
    (response) => response, // Просто возвращаем ответ, если всё ок
    async (error) => {
        const originalRequest = error.config;

        // Если ошибка 401 и запрос не на refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Чтобы не зациклить запрос

            try {
                await api.post(REFRESH_URL); // Отправляем refresh-запрос
                return api(originalRequest); // Повторяем оригинальный запрос
            } catch (refreshError) {
                console.log('Не удалось обновить токен', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const fetchRegister = async (registerModel: IRegisterModel) => {
    const response = await api.post(REGISTER_URL,
        JSON.stringify(registerModel)
    );

    return response.data;
}

export const fetchLogin = async (loginModel: ILoginModel) => {
    const response = await api.post(LOGIN_URL,
        JSON.stringify(loginModel)
    )
    return response.data;

}

export const fetchUserInfo = async () => {
    const response = await api.get<IUserModel>(USER_URL);
    return response.data;
}

export const fetchLogout = async () => {
    const response = await api.post(LOGOUT_URL);
    return response.data;
}

export const fetchSavedNews = async (): Promise<Array<INewsItemState>> => {
    const response = await api.get<Array<INewsItemState>>(GET_NEWS_URL);
    return response.data;
}

export const fetchAddNews = async (article: INewsItemState): Promise<INewsItemState> => {
    const response = await api.post(ADD_NEWS_URL, JSON.stringify(article));
    return response.data;
}

export const fetchDeleteNews = async (articleId: string): Promise<IDeletedNews> => {
    const response = await api.delete(DELETE_NEWS_URL, {
        params: {
            article_id: articleId,
        }
    });
    return response.data;
}