export interface PageProfileSchema {
	data?: ProfileData;
	tempData?: ProfileData;
	readOnly?: boolean;
	isLoading: boolean;
	isFetching: boolean;
}

export interface ProfileData {
    first_name: string | null;
    last_name: string | null;
    middle_name: string | null;
    phone: string | null;
    city: string | null;
    benefits: string | null;
    gender: string | null;
}

export interface ResponseData {
	data: ProfileData;
}
