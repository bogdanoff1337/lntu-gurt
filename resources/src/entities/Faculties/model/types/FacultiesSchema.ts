export interface FacultiesSchema {
	data?: Faculty[];
	isLoading?: boolean
	error?: string;
}

export interface FacultyData {
	data: Faculty[]
}

export interface Faculty {
	id: number;
	slug: string;
	image: string
}
