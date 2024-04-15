import { RootState } from "@/app/providers/StoreProvider";

export const getIsShow = (state: RootState) => state.featureMenu.isShow;
