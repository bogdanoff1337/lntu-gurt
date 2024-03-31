export const validateСonfirmPassword = (password: string, confirmPassword: string) => {  
  if (password !== confirmPassword) {
	return { ok: false, message: "Паролеві дані не співпадають" };
  }

	return { ok: true };
};
