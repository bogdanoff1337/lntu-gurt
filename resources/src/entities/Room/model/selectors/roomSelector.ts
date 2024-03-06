import { StateSchema } from "@/app/providers/StoreProvider";

export const getRoomsData = (state: StateSchema) => state.room;
export const getRoomsIsLoading = (state: StateSchema) => state.room.isLoading;
export const getRoomsError = (state: StateSchema) => state.room.error;
