import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { entityFacultiesSlice } from "@/entities/Faculties";
import { entityRoomsSlice } from "@/entities/Rooms";
import { $api } from "@/shared/api/api";
import { ExtraArgumentType } from "./StateSchema";
import { entityRoomSlice } from "@/entities/Room";
import { pageBookFormSlice } from "@/pages/BookRoomPage";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		entityFacultiesSlice,
		entityRoomsSlice,
		entityRoomSlice,
		pageBookFormSlice
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
