import {RootState} from "../../store.ts";

export const selectAuth = ((state:RootState) => state.auth);
export const selectIsAuthenticated = ((state: RootState) => state.auth.isAuthenticated);
export const selectError = ((state: RootState) => state.auth.error);
export const selectUsername = ((state: RootState) => state.auth.username);