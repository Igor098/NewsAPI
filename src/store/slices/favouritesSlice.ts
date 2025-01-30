import {IFavouritesNewsState, INewsItemState} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: IFavouritesNewsState = {
    articles: []
}


export const favouritesNewsSlice = createSlice({
    name: "favourites",
    initialState,

    reducers: {
        addNews: (state: IFavouritesNewsState, action: PayloadAction<INewsItemState>) => {
            state.articles = [...state.articles, action.payload];
        },
        removeNews: (state: IFavouritesNewsState, action: PayloadAction<string>) => {
            state.articles = state.articles.filter((article) => article.url.includes(action.payload))
        }
    }
})

export const {addNews, removeNews} = favouritesNewsSlice.actions;
export default favouritesNewsSlice.reducer;