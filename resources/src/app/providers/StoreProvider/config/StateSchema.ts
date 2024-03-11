import { AxiosInstance } from "axios";
import { EntityFacultiesSchema, entityFacultiesSlice } from "@/entities/Faculties";

export interface StateSchema {
	[entityFacultiesSlice.name]: EntityFacultiesSchema,
}

export type StateSchemaKey = keyof StateSchema;

export interface ExtraArgumentType {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ExtraArgumentType;
}
