import { StateSchema } from "@/app/providers/StoreProvider";

export const getData = (state: StateSchema) => state.entityRooms.data;
export const getIsLoading = (state: StateSchema) => state.entityRooms.isLoading;
export const getIsFetching = (state: StateSchema) => state.entityRooms.isFetching;
export const getError = (state: StateSchema) => state.entityRooms.error;
