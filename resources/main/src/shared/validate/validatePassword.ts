export const validatePassword = (password: string) => {
	if (password.length < 8) {
		return { ok: false, message: "Пароль повинен містити не менше 8 символів" };
	}

	return { ok: true };
};
