import { RootState } from "@/app/providers/StoreProvider";

export const getEntityFacultiesData = (state: RootState) => state.entityFaculties.data;
export const getEntityFacultiesIsLoading = (state: RootState) => state.entityFaculties.isLoading;
export const getEntityFacultiesError = (state: RootState) => state.entityFaculties.error;
