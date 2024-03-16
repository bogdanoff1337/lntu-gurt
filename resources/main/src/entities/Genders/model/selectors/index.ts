import { StateSchema } from "@/app/providers/StoreProvider";

export const getEntityFacultiesData = (state: StateSchema) => state.entityFaculties.data;
export const getEntityFacultiesIsLoading = (state: StateSchema) => state.entityFaculties.isLoading;
export const getEntityFacultiesError = (state: StateSchema) => state.entityFaculties.error;
