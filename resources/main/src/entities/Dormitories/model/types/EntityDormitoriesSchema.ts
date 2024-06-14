export interface EntityDormitoriesSchema {
	data?: Dormitory[];
	isLoading?: boolean;
	error?: string;
}

export interface DormitoriesData {
	data: Dormitory[];
}

interface Dormitory {
	id: number;
	slug: string;
	address: string;
}
