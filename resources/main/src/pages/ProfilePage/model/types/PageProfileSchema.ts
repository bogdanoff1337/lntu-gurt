export interface PageProfileSchema {
	data?: ProfileData;
	tempData?: ProfileData;
	readOnly?: boolean;
	isLoading: boolean;
	isFetching: boolean;

	citiesIsLoading: boolean;
	cities?: {
		id: number;
		name: string;
	}[];
    privileges?: {
        id: number;
        name: string;
    }[];
    privilegesIsLoading: boolean
}

export interface ProfileData {
	first_name: string;
	last_name: string;
    middle_name: string;
	phone: string;
	city: {
		id: number;
		name: string;
	};
    privilege: number
    privilegesIsLoading: boolean
	gender: string;
	faculty_id: number;
	course: number;
}

export interface ResponseData {
	data: ProfileData;
}
