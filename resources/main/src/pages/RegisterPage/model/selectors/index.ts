import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.pageRegisterAuth.data;
export const getIsLoading = (state: RootState) => state.pageRegisterAuth.isLoading;
export const getError = (state: RootState) => state.pageRegisterAuth.error;
