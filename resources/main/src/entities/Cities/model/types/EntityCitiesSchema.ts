export interface EntityCitiesSchema {
	data?: ResponseData;
	isLoading: boolean;
	error?: string;
}

export interface ResponseData {
	data: City[];
}

export interface City {
	id: number;
	slug: string;
}
