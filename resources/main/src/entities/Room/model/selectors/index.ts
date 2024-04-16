import { StateSchema } from "@/app/providers/StoreProvider";

export const getEntityRoomData = (state: StateSchema) => state.entityRoom.data;
export const getEntityRoomIsLoading = (state: StateSchema) => state.entityRoom.isLoading;
export const getEntityRoomIsFetching = (state: StateSchema) => state.entityRoom.isFetching;
export const getEntityRoomError = (state: StateSchema) => state.entityRoom.error;
