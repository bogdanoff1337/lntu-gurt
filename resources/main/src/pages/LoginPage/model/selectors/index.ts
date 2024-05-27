import { StateSchema } from "@/app/providers/StoreProvider";

export const getData = (state: StateSchema) => state.pageLoginAuth.data;
export const getIsLoading = (state: StateSchema) => state.pageLoginAuth.isLoading;
export const getError = (state: StateSchema) => state.pageLoginAuth.error;
