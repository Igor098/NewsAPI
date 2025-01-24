import axios from "axios";
import {INewsItemSource} from "../types/types.ts";

// const API_KEY = "5f777462f83a476d90fc7548ea004ff3";
// const BASE_URL = "https://newsapi.org/v2/everything";
const API_KEY = "8cd470fc90df75c1226666a611f26e92";
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

export const fetchNews = async (category: string) => {
    const response = await axios.get<INewsItemSource>(BASE_URL, {
        params: {
            apikey: API_KEY,
            country: "ru",
            lang: "ru",
            category: category,
        }
    });
    
    return response.data;
}

export const searchNews = async (query: string) => {
    const response = await axios.get<INewsItemSource>(BASE_URL, {
        params: {
            apikey: API_KEY,
            country: "ru",
            lang: "ru",
            q: query,
        }
    });

    return response.data;
}