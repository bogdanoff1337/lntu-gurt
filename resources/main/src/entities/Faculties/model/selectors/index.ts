import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.entityFaculties.data;
export const getIsLoading = (state: RootState) => state.entityFaculties.isLoading;
export const getError = (state: RootState) => state.entityFaculties.error;
