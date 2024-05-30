import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.entityRoom.data;
export const getIsLoading = (state: RootState) => state.entityRoom.isLoading;
export const getIsFetching = (state: RootState) => state.entityRoom.isFetching;
export const getError = (state: RootState) => state.entityRoom.error;
