export interface UserSchema {
	authData?: User;
	_init: boolean;
}

export interface User {
	id: string;
	name: string;
	phone: string;
	email: string;
	password: string;
}
