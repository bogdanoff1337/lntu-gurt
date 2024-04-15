import { StateSchema } from "@/app/providers/StoreProvider";
import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.pageRegisterAuth.data;
export const getIsLoading = (state: RootState) => state.pageRegisterAuth.isLoading;
