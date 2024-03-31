export interface EntityUserSchema {
	data?: User;
	isLoading?: boolean
	error?: string;
}

interface User {
	id: number,
}
