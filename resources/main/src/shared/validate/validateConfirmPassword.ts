export const validateConfirmPassword = (password: string, confirmPassword: string) => {
	if (!confirmPassword.length) {
		return { ok: false, message: "Поле не заповнене" };
	}

	if (password !== confirmPassword) {
		return { ok: false, message: "Паролеві дані не співпадають" };
	}

	return { ok: true };
};
