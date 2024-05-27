import clsx from "clsx";
import { FC, SyntheticEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthForm, AuthFormModifier } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryField } from "@/shared/ui/Fields";
import * as pageRegisterSelectors from "../../model/selectors";
import { pageLoginAuthActions } from "../../model/slice/PageLoginAuthSlice";
import cls from "./LoginAuthForm.module.scss";

interface LoginAuthFormProps {
	className?: string
}

export const LoginAuthForm: FC<LoginAuthFormProps> = ({ className }) => {
	const data = useSelector(pageRegisterSelectors.getData);
	const isLoading = useSelector(pageRegisterSelectors.getIsLoading);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const onSubmit = useCallback((e: SyntheticEvent) => {
		e.preventDefault();

		dispatch(pageLoginAuthActions.submitForm()).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				navigate("/");
				dispatch(pageLoginAuthActions.clearFields());
			}
		});
	}, [dispatch, navigate]);

	const onChangeEmail = useCallback((value: string) => {
		dispatch(pageLoginAuthActions.changeEmail(value));
	}, [dispatch]);

	const onBlurValidateEmail = useCallback(() => {
		dispatch(pageLoginAuthActions.validataEmail());
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(pageLoginAuthActions.changePassword(value));
	}, [dispatch]);

	const onBlurValidatePassword = useCallback(() => {
		dispatch(pageLoginAuthActions.validataPassword());
	}, [dispatch]);

	return (
		<AuthForm
			className={clsx(cls.LoginAuthForm, [className])}
			onSubmit={onSubmit}
			modifier={AuthFormModifier.login}
			isLoading={isLoading}
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
		</AuthForm>

	);
};
