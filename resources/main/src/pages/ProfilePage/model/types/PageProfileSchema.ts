export interface PageProfileSchema {
	data: Data;
	tempData: Data;
	readOnly?: boolean;
	isLoading: boolean;
	isFetching: boolean;
}

export interface Data {
	first_name?: string
	last_name?: string
	father_name?: string
	address?: string
	gender?: string
	phone?: string
	benefits?: string
}


export interface ResponseData {
	data: Data
}