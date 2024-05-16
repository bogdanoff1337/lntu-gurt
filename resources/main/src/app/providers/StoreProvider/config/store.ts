import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { pageLoginAuthSlice } from "@/pages/LoginPage";
import { pageProfileSlice } from "@/pages/ProfilePage";
import { pageRegisterAuthSlice } from "@/pages/RegisterPage";
import { featureMenuSlice } from "@/features/Menu";
import { featureOverlaySlice } from "@/features/Overlay";
import { entityAuthSlice } from "@/entities/Auth";
import { entityFacultiesSlice } from "@/entities/Faculties";
import { entityRoomSlice } from "@/entities/Room";
import { entityRoomsSlice } from "@/entities/Rooms";
import { $api } from "@/shared/api/api";
import { ExtraArgumentType } from "./StateSchema";
import { entityBookedRoomsSlice } from "@/entities/BookedRooms";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		pageProfileSlice,
		pageRegisterAuthSlice,
		pageLoginAuthSlice,
		pageProfileSlice,
		entityFacultiesSlice,
		entityRoomsSlice,
		entityRoomSlice,
		entityAuthSlice,
		entityBookedRoomsSlice,
		featureOverlaySlice,
		featureMenuSlice,
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
