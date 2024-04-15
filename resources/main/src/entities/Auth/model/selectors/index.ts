import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.entityAuth.data;
export const getIsLoading = (state: RootState) => state.entityAuth.isLoading;
