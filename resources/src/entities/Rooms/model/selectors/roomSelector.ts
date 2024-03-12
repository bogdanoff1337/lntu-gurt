import { StateSchema } from "@/app/providers/StoreProvider";

export const getRoomsIsLoading = (state: StateSchema) => state.room.isLoading;
export const getRoomsError = (state: StateSchema) => state.room.error;
export const getRoomsData = (state: StateSchema) => state.room.data;
export const getRoomsDataLinks = (state: StateSchema) => state.room.data?.links;
export const getRoomsDataMeta = (state: StateSchema) => state.room.data?.meta;