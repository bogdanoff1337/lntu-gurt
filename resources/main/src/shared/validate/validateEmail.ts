export const validateEmail = (email: string) => {
	const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		return { ok: false, message: "Невірна адреса електронної пошти" };
	}

	return { ok: true };
};
