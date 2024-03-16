import { StateSchema } from "@/app/providers/StoreProvider";

export const getEntityRoomsData = (state: StateSchema) => state.entityRooms.data;
export const getEntityRoomsIsLoading = (state: StateSchema) => state.entityRooms.isLoading;
export const getEntityRoomsError = (state: StateSchema) => state.entityRooms.error;
