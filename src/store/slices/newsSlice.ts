import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {fetchNews, fetchNewsByQuery} from "../../api/newsAPI.ts";
import {INewsItemSource, INewsItemApiState, INewsState, INewsItemState} from "../../types/types.ts";
import {generateUniqueId} from "../../utils/utils.ts";


const initialState: INewsState = {
    newsArticles: [],
    searchResults: [],
    loading: false,
    newsError: null,
    category: 'general',
}

export const loadNews = createAsyncThunk(
    'news/loadNews',
    async (category: string): Promise<INewsItemSource> => {
        return await fetchNews(category);
    }
)

export const searchNews = createAsyncThunk(
    'news/searchNews',
    async (query: string): Promise<INewsItemSource> => {
        const resp = await fetchNewsByQuery(query);
        console.log(resp)
        return resp;
    }
)

export const newsSlice = createSlice({
    name: "news",
    initialState,

    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },

        setArticles: (state, action: PayloadAction<Array<INewsItemState>>) => {
            state.newsArticles = action.payload;
        },

        setSearchResults: (state, action: PayloadAction<Array<INewsItemState>>) => {
            state.searchResults = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadNews.pending, (state) => {
                state.loading = true;
                state.newsError = null;
            })

            .addCase(loadNews.fulfilled, (state, action: PayloadAction<INewsItemSource>) => {
                state.loading = false;
                const articles: Array<INewsItemApiState> = action.payload.articles;
                state.newsArticles = articles.map((article: INewsItemApiState) => {
                    return {id: generateUniqueId(), ...article}
                })
            })

            .addCase(loadNews.rejected, (state, action) => {
                state.loading = false;
                state.newsError = action.error.message || 'Something went wrong';
            })

            .addCase(searchNews.pending, (state) => {
                state.loading = true;
                state.newsError = null;
            })

            .addCase(searchNews.fulfilled, (state, action: PayloadAction<INewsItemSource>) => {
                state.loading = false;
                const articles: Array<INewsItemApiState> = action.payload.articles;
                state.searchResults = articles.map((article: INewsItemApiState) => {
                    return {id: generateUniqueId(), ...article}
                })
            })

            .addCase(searchNews.rejected, (state, action) => {
                state.loading = false;
                state.newsError = action.error.message || 'Something went wrong';
            })
    }
})

export const {setCategory, setArticles, setSearchResults} = newsSlice.actions;
export default newsSlice.reducer;