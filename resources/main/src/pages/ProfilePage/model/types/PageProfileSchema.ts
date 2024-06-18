export interface PageProfileSchema {
	data?: ProfileData;
	tempData?: ProfileData;
	readOnly?: boolean;
	isLoading: boolean;
	isFetching: boolean;

	citiesIsLoading: boolean;
	cities?: {
		id: number;
		slug: string;
	}[];
}

export interface ProfileData {
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	phone: string | null;
	city: {
		id: number;
		slug: string;
	} | null;
	benefits: string | null;
	gender: string | null;
	faculty_id: number | null;
	course: number | null;
}

export interface ResponseData {
	data: ProfileData;
}
