import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.pageLoginAuth.data;
export const getIsLoading = (state: RootState) => state.pageLoginAuth.isLoading;
export const getError = (state: RootState) => state.pageLoginAuth.error;
