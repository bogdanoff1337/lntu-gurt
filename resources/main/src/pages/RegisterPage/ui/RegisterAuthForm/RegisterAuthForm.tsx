import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "@/entities/Auth";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { PrimaryField } from "@/shared/ui/Fields";
import * as pageRegisterAuthSelectors from "../../model/selectors";
import { pageRegisterAuthActions } from "../../model/slice/pageRegisterAuthSlice";
import cls from "./RegisterAuthForm.module.scss";

interface RegisterAuthFormProps {
	className?: string;
}

export const RegisterAuthForm: FC<RegisterAuthFormProps> = ({ className }) => {
	const data = useSelector(pageRegisterAuthSelectors.getData);
	const dispatch = useDispatch();

	const onSubmit = useCallback(() => {
	}, []);

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
			className={cn(cls.RegisterAuthForm, {}, [className])}
			onSubmit={onSubmit}
			submitName="Зареєструватися"
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
