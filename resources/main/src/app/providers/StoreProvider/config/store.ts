import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { pageLoginAuthSlice } from "@/pages/LoginPage";
import { pageProfileSlice } from "@/pages/ProfilePage";
import { pageRegisterAuthSlice } from "@/pages/RegisterPage";
import { pageVerifySlice } from "@/pages/VerifyPage";
import { featureMenuSlice } from "@/features/Menu";
import { entityAuthSlice } from "@/entities/Auth";
import { entityBookedRoomsSlice } from "@/entities/BookedRooms";
import { entityCitiesSlice } from "@/entities/Cities";
import { entityDormitoriesSlice } from "@/entities/Dormitories";
import { entityFacultiesSlice } from "@/entities/Faculties";
import { entityRoomSlice } from "@/entities/Room";
import { entityRoomsSlice } from "@/entities/Rooms";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { ExtraArgumentType } from "./StateSchema";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		pageProfileSlice,
		pageRegisterAuthSlice,
		pageLoginAuthSlice,
		pageProfileSlice,
		pageVerifySlice,
		entityFacultiesSlice,
		entityRoomsSlice,
		entityRoomSlice,
		entityAuthSlice,
		entityBookedRoomsSlice,
		entityDormitoriesSlice,
		entityCitiesSlice,
		featureMenuSlice,
		{
			[rtkApi.reducerPath]: rtkApi.reducer,
		},
	);

	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
		}).concat(rtkApi.middleware),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
