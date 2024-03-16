import { EntityState } from "@reduxjs/toolkit";

export interface DormitorySchema extends EntityState<Dormitory, any> {
	isLoading?: boolean;
	error?: string;
}

export type DormitoryData = {
	data: Dormitory[];
};

export type Dormitory = {
	id: string;
	slug: string;
	address: string;
};
