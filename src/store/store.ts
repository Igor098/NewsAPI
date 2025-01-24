import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import favouritesNewsReducer from "./slices/favouritesSlice";


export const store =  configureStore({
    reducer: {
        news: newsReducer,
        favourites: favouritesNewsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;