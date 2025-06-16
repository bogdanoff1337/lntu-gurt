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
	first_name: string;
	last_name: string;
    middle_name: string;
	phone: string;
	city: {
		id: number;
		slug: string;
	};
	benefits: string | null;
	gender: string;
	faculty_id: number;
	course: number;
}

export interface ResponseData {
	data: ProfileData;
}
