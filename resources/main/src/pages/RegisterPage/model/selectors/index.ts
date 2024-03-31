import { StateSchema } from "@/app/providers/StoreProvider";

export const getData = (state: StateSchema) => state.pageRegisterAuth.data;
