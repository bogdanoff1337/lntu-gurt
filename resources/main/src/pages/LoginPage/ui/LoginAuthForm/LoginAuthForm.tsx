import clsx from "clsx";
import {
	FC, SyntheticEvent, memo, useCallback,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthForm, AuthFormModifier } from "@/entities/Auth";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryField } from "@/shared/ui/Fields";
import * as pageRegisterSelectors from "../../model/selectors";
import { pageLoginAuthActions } from "../../model/slice/PageLoginAuthSlice";
import cls from "./LoginAuthForm.module.scss";

interface LoginAuthFormProps {
	className?: string
}

export const LoginAuthForm: FC<LoginAuthFormProps> = memo(({ className }) => {
	const data = useSelector(pageRegisterSelectors.getData);
	const isLoading = useSelector(pageRegisterSelectors.getIsLoading);
	const error = useSelector(pageRegisterSelectors.getError);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = useCallback((e: SyntheticEvent) => {
		e.preventDefault();

		dispatch(pageLoginAuthActions.submitForm()).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				navigate(getMainRoutePath());
				dispatch(pageLoginAuthActions.clearFields());
			}
		});
	}, [dispatch, navigate]);

	const onChangeEmail = useCallback((value: string) => {
		dispatch(pageLoginAuthActions.changeEmail(value));
	}, [dispatch]);

	const onBlurValidateEmail = useCallback(() => {
		dispatch(pageLoginAuthActions.validatePassword());
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(pageLoginAuthActions.changePassword(value));
	}, [dispatch]);

	const onBlurValidatePassword = useCallback(() => {
		dispatch(pageLoginAuthActions.validatePassword());
	}, [dispatch]);

	return (
		<AuthForm
			className={clsx(cls.LoginAuthForm, [className])}
			onSubmit={onSubmit}
			modifier={AuthFormModifier.login}
			isLoading={isLoading}
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
		</AuthForm>
	);
});
