import { AxiosInstance } from "axios";
import { EntityFacultiesSchema, entityFacultiesSlice } from "@/entities/Faculties";
import { EntityRoomsSchema, entityRoomsSlice } from "@/entities/Rooms";

export interface StateSchema {
	[entityFacultiesSlice.name]: EntityFacultiesSchema,
	[entityRoomsSlice.name]: EntityRoomsSchema,
}

export type StateSchemaKey = keyof StateSchema;

export interface ExtraArgumentType {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ExtraArgumentType;
}
