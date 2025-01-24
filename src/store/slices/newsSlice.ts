import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNews } from "../../api/newsAPI.ts";
import { INewsItemSource, INewsState } from "../../types/types.ts";


const initialState: INewsState = {
    articles: [],
    loading: false,
    error: null,
    category: 'general',
    searchQuery: '',
}

export const loadNews = createAsyncThunk(
    'news/loadNews',
    async (category: string): Promise<INewsItemSource> => {
        return await fetchNews(category);
    }
)

export const newsSlice = createSlice({
    name: "news",
    initialState,

    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loadNews.fulfilled, (state, action: PayloadAction<INewsItemSource>) => {
                state.loading = false;
                state.articles = action.payload.articles;
            })

            .addCase(loadNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export const {setCategory, setSearchQuery} = newsSlice.actions;
export default newsSlice.reducer;