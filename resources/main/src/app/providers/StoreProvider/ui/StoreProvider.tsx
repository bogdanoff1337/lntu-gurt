import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
	children: ReactNode;
}

export const store = createReduxStore();

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
