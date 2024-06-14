export interface PageRegisterAuthSchema {
	data: {
		email: Field;
		password: Field;
		confirmPassword: Field;
	}
	isLoading: boolean;
	error?: {
		title: string;
		text: string;
	};
}

interface Field {
	value: string;
	errorMessage?: string;
	ok?: boolean;
}

export interface TokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
}
