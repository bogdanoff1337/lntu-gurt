import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.entityDormitories.data;
export const getIsLoading = (state: RootState) => state.entityDormitories.isLoading;
export const getError = (state: RootState) => state.entityDormitories.error;
