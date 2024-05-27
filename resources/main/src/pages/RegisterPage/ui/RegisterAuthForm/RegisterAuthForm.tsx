import clsx from "clsx";
import { FC, SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthForm, AuthFormModifier } from "@/entities/Auth";
import { PrimaryField } from "@/shared/ui/Fields";
import * as pageRegisterAuthSelectors from "../../model/selectors";
import { pageRegisterAuthActions } from "../../model/slice/pageRegisterAuthSlice";
import cls from "./RegisterAuthForm.module.scss";

interface RegisterAuthFormProps {
	className?: string;
}

export const RegisterAuthForm: FC<RegisterAuthFormProps> = ({ className }) => {
	const data = useSelector(pageRegisterAuthSelectors.getData);
	const isLoading = useSelector(pageRegisterAuthSelectors.getIsLoading);
	const error = useSelector(pageRegisterAuthSelectors.getError);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = useCallback((e: SyntheticEvent) => {
		e.preventDefault();

		// @ts-ignore
		dispatch(pageRegisterAuthActions.submitForm()).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				navigate("/");
				dispatch(pageRegisterAuthActions.clearFields());
			}
		});
	}, [dispatch, navigate]);

	const onChangeEmail = useCallback((value: string) => {
		dispatch(pageRegisterAuthActions.changeEmail(value));
	}, [dispatch]);

	const onBlurValidateEmail = useCallback(() => {
		dispatch(pageRegisterAuthActions.validataEmail());
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(pageRegisterAuthActions.changePassword(value));
	}, [dispatch]);

	const onBlurValidatePassword = useCallback(() => {
		dispatch(pageRegisterAuthActions.validataPassword());
	}, [dispatch]);

	const onChangeConfirmPassword = useCallback((value: string) => {
		dispatch(pageRegisterAuthActions.changeConfirmPassword(value));
	}, [dispatch]);

	const onBlurValidateConfirmPassword = useCallback(() => {
		dispatch(pageRegisterAuthActions.validataConfirmPassword());
	}, [dispatch]);

	return (
		<AuthForm
			className={clsx(cls.RegisterAuthForm, [className])}
			onSubmit={onSubmit}
			isLoading={isLoading}
			modifier={AuthFormModifier.register}
			error={error}
		>
			<PrimaryField
				placeholder="Email"
				onChange={onChangeEmail}
				onBlur={onBlurValidateEmail}
				value={data.email.value}
				errorMessage={data.email.errorMessage}
				isSuccess={data.email.ok}
			/>
			<PrimaryField
				placeholder="Пароль"
				onChange={onChangePassword}
				onBlur={onBlurValidatePassword}
				value={data.password.value}
				errorMessage={data.password.errorMessage}
				isSuccess={data.password.ok}
				type="password"
			/>
			<PrimaryField
				placeholder="Підтвердження пароля"
				onChange={onChangeConfirmPassword}
				onBlur={onBlurValidateConfirmPassword}
				value={data.confirmPassword.value}
				errorMessage={data.confirmPassword.errorMessage}
				isSuccess={data.confirmPassword.ok}
				type="password"
			/>
		</AuthForm>
	);
};
