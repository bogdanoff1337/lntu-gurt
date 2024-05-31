import { AxiosInstance } from "axios";
import { PageLoginAuthSchema } from "@/pages/LoginPage";
import { PageProfileSchema } from "@/pages/ProfilePage";
import { PageRegisterAuthSchema } from "@/pages/RegisterPage";
import { EntityFacultiesSchema } from "@/entities/Faculties";
import { EntityRoomSchema } from "@/entities/Room";
import { EntityRoomsSchema } from "@/entities/Rooms";
import { RootState } from "./store";

export interface StateSchema {
	entityFaculties: EntityFacultiesSchema;
	entityRooms: EntityRoomsSchema;
	entityRoom: EntityRoomSchema;
	pageRegisterAuth: PageRegisterAuthSchema;
	pageLoginAuth: PageLoginAuthSchema;
}

// export type StateSchemaKey = keyof StateSchema;

export interface ExtraArgumentType {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ExtraArgumentType;
}
