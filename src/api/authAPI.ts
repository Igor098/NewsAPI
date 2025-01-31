import axios from "axios";
import {ILoginModel, IRegisterModel, IUserModel} from "../types/types.ts";


const REGISTER_URL = "/auth/register/";
const LOGIN_URL = "/auth/login/";
const USER_URL = "/auth/me/";
const REFRESH_URL = "/auth/refresh/";
const LOGOUT_URL = "/auth/logout/";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
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
            console.log("Ошибка произошла!")
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