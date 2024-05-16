import { RootState } from "@/app/providers/StoreProvider";

export const data = (state: RootState) => state.entityBookedRooms.data;
export const isLoading = (state: RootState) => state.entityBookedRooms.isLoading;
export const error = (state: RootState) => state.entityBookedRooms.error;
