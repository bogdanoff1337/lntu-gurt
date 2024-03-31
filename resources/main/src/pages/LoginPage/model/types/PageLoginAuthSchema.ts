export interface PageLoginAuthSchema {
	data: {
		email: Field;
		password: Field;
		confirmPassword: Field;
	}
}

interface Field {
	value: string;
	errorMessage?: string;
	ok?: boolean;
}
