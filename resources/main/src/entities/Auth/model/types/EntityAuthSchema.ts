export interface EntityAuthSchema {
	data?: UserData;
	isLoading: boolean;
	error?: string;
}

export interface UserData {
	id: number;
	email: string;
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	phone: string | null;
	city: string | null;
	benefits: string | null;
	verified: boolean;
}

export interface TokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
}
