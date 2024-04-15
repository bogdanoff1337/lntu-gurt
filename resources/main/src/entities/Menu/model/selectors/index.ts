import { RootState } from "@/app/providers/StoreProvider";

export const getData = (state: RootState) => state.featureOverlay.isShow;
