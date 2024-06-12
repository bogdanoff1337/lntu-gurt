import { RootState } from "@/app/providers/StoreProvider";

export const data = (state: RootState) => state.entityCities.data;
export const isLoading = (state: RootState) => state.entityCities.isLoading;
export const error = (state: RootState) => state.entityCities.error;
