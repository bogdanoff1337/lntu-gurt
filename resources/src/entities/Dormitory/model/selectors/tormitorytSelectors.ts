import { StateSchema } from "@/app/providers/StoreProvider";

export const getArticlesPageIsLoading = (state: StateSchema) => state.dormitories.isLoading;
export const getArticlesPageError = (state: StateSchema) => state.dormitories.error;
