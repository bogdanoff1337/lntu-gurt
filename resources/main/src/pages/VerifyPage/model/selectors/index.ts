import { RootState } from "@/app/providers/StoreProvider";

export const getIsLoading = (state: RootState) => state.pageVerify.isLoading;
export const getError = (state: RootState) => state.pageVerify.error;
