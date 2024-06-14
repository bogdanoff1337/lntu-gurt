import { ThunkConfig } from "./config/StateSchema";
import { AppDispatch, RootState } from "./config/store";
import StoreProvider, { store } from "./ui/StoreProvider";

export { StoreProvider, store };

export type {
	AppDispatch, RootState, ThunkConfig,
};
