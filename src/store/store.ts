import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import favouritesNewsReducer from "./slices/favouritesSlice";
import authReducer from "./slices/authSlice";


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