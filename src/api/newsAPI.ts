import axios from "axios";
import {INewsItemSource} from "../types/types.ts";

const API_KEY = "443883ef4c0baa257002a3a8759a110d";
const BASE_URL = "https://gnews.io/api/v4/top-headlines";
const SEARCH_URL = "https://gnews.io/api/v4/search";

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

export const fetchNewsByQuery = async (query: string) => {
    const response = await axios.get<INewsItemSource>(SEARCH_URL, {
        params: {
            apikey: API_KEY,
            country: "ru",
            lang: "ru",
            q: query,
        }
    });
    console.log(response.data)
    return response.data;
}