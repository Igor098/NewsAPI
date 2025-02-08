import {RootState} from "../../store.ts";

export const selectArticles = ((state: RootState) => state.favourites.articles);
export const selectError = ((state: RootState) => state.favourites.error);
export const selectLoading = ((state: RootState) => state.favourites.loading);