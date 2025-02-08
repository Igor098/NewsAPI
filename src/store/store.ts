import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/news/newsSlice.ts";
import favouritesNewsReducer from "./slices/favourites/favouritesSlice.ts";
import authReducer from "./slices/auth/authSlice.ts";


export const store =  configureStore({
    reducer: {
        news: newsReducer,
        favourites: favouritesNewsReducer,
        auth: authReducer,
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type RootDispatch = AppStore['dispatch'];