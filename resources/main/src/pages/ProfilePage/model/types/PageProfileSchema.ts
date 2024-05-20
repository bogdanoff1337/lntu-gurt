export interface PageProfileSchema {
	data?: ProfileData;
	tempData?: ProfileData;
	readOnly?: boolean;
	isLoading: boolean;
	isFetching: boolean;
}

export interface ProfileData {
	first_name?: string;
	last_name?: string;
	father_name?: string;
	address?: string;
	gender?: string;
	phone?: string;
	benefits?: string;
}

export interface ResponseData {
	data: ProfileData;
}