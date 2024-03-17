import { AxiosInstance } from "axios";
import { PageBookRoomSchema } from "@/pages/BookRoomPage";
import { EntityFacultiesSchema } from "@/entities/Faculties";
import { EntityRoomSchema } from "@/entities/Room";
import { EntityRoomsSchema } from "@/entities/Rooms";

export interface StateSchema {
	entityFaculties: EntityFacultiesSchema;
	entityRooms: EntityRoomsSchema;
	entityRoom: EntityRoomSchema;
	pageBookForm: PageBookRoomSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ExtraArgumentType {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ExtraArgumentType;
	// state: StateSchema;
}
