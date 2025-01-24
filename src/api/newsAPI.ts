import axios, {AxiosResponse} from "axios";
import {INewsItemSource} from "../types/types.ts";

const API_KEY = "5f777462f83a476d90fc7548ea004ff3";
const BASE_URL = "https://newsapi.org/v2/everything";

export const fetchNews = async (query: string) => {
    const response: AxiosResponse<INewsItemSource, any> = await axios.get<INewsItemSource>(BASE_URL, {
        params: {
            apiKey: API_KEY,
            q: query,
            language: "ru",
        }
    });
    
    return response.data;
}