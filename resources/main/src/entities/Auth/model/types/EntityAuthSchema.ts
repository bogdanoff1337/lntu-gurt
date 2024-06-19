export interface EntityAuthSchema {
	data?: UserData;
	isLoading: boolean;
	error?: string;
}

export interface UserData {
	id: number;
	email: string;
	verified: boolean;
	profileFilled: boolean;
}

export interface TokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
}
