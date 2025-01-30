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

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;