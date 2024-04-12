import { FC, SyntheticEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { AuthForm } from "@/entities/Auth";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { useDebounce } from "@/shared/hooks/useDebaunce/useDebaunce";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
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

	const dispatch = useDispatch();

	const onSubmit = useCallback((e: SyntheticEvent) => {
		e.preventDefault();

		// @ts-ignore
		dispatch(pageLoginAuthActions.submitForm()).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				navigate("/");
			}
		});
	}, [dispatch]);

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
			className={cn(cls.LoginAuthForm, {}, [className])}
			onSubmit={onSubmit}
			submitName="Реєстрація"
			isLoading={isLoading}
			statusErrorMessage={(
				<div className={cls.StatusError}>
					<h2 className={cls.StatusError__title}>Немає доступу для реєстрації</h2>
					<p className={cls.StatusError__text}>Вашої пошти немає в списку кандитадів на заселення в гуртожитки</p>
				</div>
			)}
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
