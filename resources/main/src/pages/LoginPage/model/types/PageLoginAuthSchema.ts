export interface PageLoginAuthSchema {
	data: {
		email: Field;
		password: Field;
		confirmPassword: Field;
	},
	isLoading: boolean;
}

interface Field {
	value: string;
	errorMessage?: string;
	warnMessage?: string;
	ok?: boolean;
}

export interface TokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
}
