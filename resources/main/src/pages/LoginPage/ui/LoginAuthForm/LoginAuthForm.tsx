import { FC, SyntheticEvent, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { AuthForm } from "@/entities/Auth";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { useDebounce } from "@/shared/hooks/useDebaunce/useDebaunce";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryField } from "@/shared/ui/Fields";
import * as pageRegisterSelectors from "../../model/selectors";
import { pageLoginAuthActions } from "../../model/slice/PageLoginAuthSlice";
import cls from "./LoginAuthForm.module.scss";

interface LoginAuthFormProps {
	className?: string
}

type Inputs = {
	email: string
	password: string
};

export const LoginAuthForm: FC<LoginAuthFormProps> = ({ className }) => {
	const data = useSelector(pageRegisterSelectors.getData);
	const isLoading = useSelector(pageRegisterSelectors.getIsLoading);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<Inputs>({
		mode: "onBlur",
	});

	const onSubmit = async (data: Inputs) => {
		console.log(data);
	};

	const dispatch = useAppDispatch();

	// const onSubmit = useCallback((e: SyntheticEvent) => {
	// 	e.preventDefault();

	// 	dispatch(pageLoginAuthActions.submitForm()).then((data) => {
	// 		if (data.meta.requestStatus === "fulfilled") {
	// 			navigate("/");
	// 		}
	// 	});
	// }, [dispatch, navigate]);

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
			onSubmit={handleSubmit(onSubmit)}
			submitName="Увійти"
			isLoading={isLoading}
			statusErrorMessage={(
				<div className={cls.StatusError}>
					<h2 className={cls.StatusError__title}>Немає доступу для реєстрації</h2>
					<p className={cls.StatusError__text}>Вашої пошти немає в списку кандитадів на заселення в гуртожитки</p>
				</div>
			)}
		>
			<PrimaryField
				// name="email"
				placeholder="Email"
				// onChange={onChangeEmail}
				// onBlur={onBlurValidateEmail}
				// value={data.email.value}
				onFocus={() => clearErrors("email")}
				errorMessage={errors.email?.message}
				// isSuccess={!errors.email}
				register={{
					...register("email", {
						required: { value: true, message: "Не заповнене поле" },
						pattern: { value: /^\S+@\S+$/i, message: "Невірний формат пошти" },
						maxLength: { value: 32, message: "Email повинен містити не більше 32 символів" },
						minLength: { value: 8, message: "Email повинен містити не менше 4 символів" },
					}),

				}}
			/>
			<PrimaryField
				placeholder="Пароль"
				// onChange={onChangePassword}
				// onBlur={onBlurValidatePassword}
				// value={data.password.value}
				onFocus={() => clearErrors("password")}
				errorMessage={errors.password?.message}
				// isSuccess={}
				type="password"
				register={{
					...register("password", {
						required: { value: true, message: "Не заповнене поле" },
						minLength: { value: 8, message: "Пароль повинен містити не менше 8 символів" },
						maxLength: { value: 32, message: "Пароль повинен містити не більше 32 символів" },
					}),
				}}
			/>
		</AuthForm>

	);
};
