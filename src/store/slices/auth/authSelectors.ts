import {RootState} from "../../store.ts";

export const selectIsAuthenticated = ((state: RootState) => state.auth.isAuthenticated);
export const selectError = ((state: RootState) => state.auth.error);
export const selectUsername = ((state: RootState) => state.auth.username);