import {
	AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from "@reduxjs/toolkit";
import { CombinedState } from "@reduxjs/toolkit/query";
import { AxiosInstance } from "axios";
import { DormitorySchema } from "@/entities/Dormitory";
import { RoomSchema } from "@/entities/Room";

export interface StateSchema {
	dormitories: DormitorySchema;
	room: RoomSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ExtraArgumentType {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ExtraArgumentType;
}
