import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { pageBookFormSlice } from "@/pages/BookRoomPage";
import { pageLoginAuthSlice } from "@/pages/LoginPage";
import { pageRegisterAuthSlice } from "@/pages/RegisterPage";
import { entityFacultiesSlice } from "@/entities/Faculties";
import { entityRoomSlice } from "@/entities/Room";
import { entityRoomsSlice } from "@/entities/Rooms";
import { $api } from "@/shared/api/api";
import { ExtraArgumentType } from "./StateSchema";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		pageBookFormSlice,
		pageRegisterAuthSlice,
		pageLoginAuthSlice,
		entityFacultiesSlice,
		entityRoomsSlice,
		entityRoomSlice,
	);

	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
		}),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
