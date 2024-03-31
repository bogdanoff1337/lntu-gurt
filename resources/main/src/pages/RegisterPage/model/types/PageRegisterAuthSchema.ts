export interface PageRegisterAuthSchema {
	data: {
		email: Field;
		password: Field;
		confirmPassword: Field;
	}
	isLoading: boolean;
	errorMessage?: string;
}

interface Field {
	value: string;
	errorMessage?: string;
	ok?: boolean;
}
