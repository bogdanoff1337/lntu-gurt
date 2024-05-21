import { EntityState } from "@reduxjs/toolkit";

export interface EntityDormitoriesSchema {
	data?: boolean;
	isLoading?: boolean;
	error?: string;
}

export interface DormitoriesData {
	data: Dormitory[];
};

interface Dormitory {
	id: string;
	slug: string;
	address: string;
};
