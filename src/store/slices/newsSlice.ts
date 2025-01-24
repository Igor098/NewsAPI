import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchNews} from "../../api/newsAPI.ts";

export const loadNews = createAsyncThunk(
    'news/loadNews',
    async (searchQuery: string) => {
        return await fetchNews(searchQuery);
    }

)

export const newsSlice = createSlice({
    name: "news",
    initialState: {
        articles: [],
        loading: false,
        error: null,
        category: 'general',
        searchQuery: '',
    },

    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload.category;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loadNews.fulfilled, (state, action) => {
                state.loading = false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.articles = action.payload;
            })

            .addCase(loadNews.rejected, (state, action) => {
                state.loading = false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.error = action.error.message;
            })
    }
})

export const {setCategory, setSearchQuery} = newsSlice.actions;
export default newsSlice.reducer;