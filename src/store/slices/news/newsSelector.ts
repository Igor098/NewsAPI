import {RootState} from "../../store.ts";

export const selectCategory = ((state: RootState) => state.news.category);
export const selectSearchResults = ((state: RootState) => state.news.searchResults);
export const selectNewsError = ((state: RootState) => state.news.newsError);
export const selectLoading = ((state: RootState) => state.news.loading);
export const selectNewsArticles = ((state: RootState) => state.news.newsArticles);