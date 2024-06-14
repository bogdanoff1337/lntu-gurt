import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.entityRooms.data;
export const getIsLoading = (state: RootState) => state.entityRooms.isLoading;
export const getIsFetching = (state: RootState) => state.entityRooms.isFetching;
export const getError = (state: RootState) => state.entityRooms.error;
