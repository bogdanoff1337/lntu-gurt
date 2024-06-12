import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.pageProfile.data;
export const getTempData = (state: RootState) => state.pageProfile.tempData;
export const getIsLoading = (state: RootState) => state.pageProfile.isLoading;
export const getIsFetching = (state: RootState) => state.pageProfile.isFetching;
export const getReadOnly = (state: RootState) => state.pageProfile.readOnly;
export const getCities = (state: RootState) => state.pageProfile.cities;
export const getCitiesIsLoading = (state: RootState) => state.pageProfile.citiesIsLoading;
