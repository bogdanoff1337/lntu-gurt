import { StateSchema } from "@/app/providers/StoreProvider";

export const getFacultiesData = (state: StateSchema) => state.faculties.data;
export const getFacultiesIsLoading = (state: StateSchema) => state.faculties.isLoading;
export const getFacultiesError = (state: StateSchema) => state.faculties.error;
