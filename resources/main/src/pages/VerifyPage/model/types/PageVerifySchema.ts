export interface PageVerifySchema {
	data?: Data;
	isLoading: boolean;
	error?: string;
}

interface Data {
	timer: number;
}
