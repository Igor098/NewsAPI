import {RootState} from "../../store.ts";

export const selectCategory = ((state: RootState) => state.news.category);