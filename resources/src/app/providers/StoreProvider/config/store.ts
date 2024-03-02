import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "@/features/Auth";
import { burgerMenuSlice } from "@/features/BurgerMenu";
import { catalogSpoilerSlice } from "@/features/Catalog";
import { feedbackSlice } from "@/features/Feedback";
import { filtersMenuSlice, filtersSlice } from "@/features/Filters";
import { productSearchSlice } from "@/features/ProductSearch";
import { babyCarriageProductDetailsSlice } from "@/entities/BabyCarriageProductDetails";
import { userSlice } from "@/entities/User";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { ExtraArgumentType } from "./StateSchema";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		userSlice,
		registerSlice,
		loginSlice,
		catalogSpoilerSlice,
		burgerMenuSlice,
		productSearchSlice,
		filtersSlice,
		filtersMenuSlice,
		babyCarriageProductDetailsSlice,
		feedbackSlice,
	);

	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		// @ts-ignore
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
		}).concat(rtkApi.middleware),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
