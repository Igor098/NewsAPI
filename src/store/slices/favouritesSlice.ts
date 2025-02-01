import {IDeletedNews, IFavouritesNewsState, INewsItemState} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAddNews, fetchDeleteNews, fetchSavedNews} from "../../api/authAPI.ts";


const initialState: IFavouritesNewsState = {
    articles: [],
    loading: false,
    error: null,
}

export const loadSavedNews = createAsyncThunk(
    "favourites/loadSavedNews",
    async (): Promise<Array<INewsItemState>> => {
        console.log("Запрос отправлен")
        return await fetchSavedNews()
    }
)

export const saveNews = createAsyncThunk(
    "favourites/saveNews",
    async (article: INewsItemState): Promise<INewsItemState> => {
        return await fetchAddNews(article);
    }
)

export const deleteNews = createAsyncThunk(
    "favourites/deleteNews",
    async (articleId: string): Promise<IDeletedNews> => {
        return await fetchDeleteNews(articleId);
    }
)


export const favouritesNewsSlice = createSlice({
    name: "favourites",
    initialState,

    reducers: {
        // removeNews: (state: IFavouritesNewsState, action: PayloadAction<string>) => {
        //     state.articles = state.articles.filter((article) => article.url.includes(action.payload))
        // }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadSavedNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loadSavedNews.fulfilled, (state, action: PayloadAction<Array<INewsItemState>>) => {
                state.loading = false;
                state.articles = action.payload;
            })

            .addCase(loadSavedNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(saveNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(saveNews.fulfilled, (state, action: PayloadAction<INewsItemState>) => {
                state.loading = false;
                state.articles = [...state.articles, action.payload]
            })

            .addCase(saveNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteNews.fulfilled, (state, action: PayloadAction<IDeletedNews>) => {
                state.loading = false;
                state.articles = state.articles.filter((item) => item.id !== action.payload.id)
            })

            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

// export const {addNews, removeNews} = favouritesNewsSlice.actions;
export default favouritesNewsSlice.reducer;