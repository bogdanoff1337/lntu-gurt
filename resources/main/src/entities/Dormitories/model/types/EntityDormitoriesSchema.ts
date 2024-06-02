export interface EntityDormitoriesSchema {
	data?: Dormitory[];
	isLoading?: boolean;
	error?: string;
}

export interface DormitoriesData {
	data: Dormitory[];
}

interface Dormitory {
	id: string;
	slug: string;
	address: string;
}
