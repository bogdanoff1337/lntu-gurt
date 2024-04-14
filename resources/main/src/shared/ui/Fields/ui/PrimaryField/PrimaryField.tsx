import {
	ChangeEvent, FC, InputHTMLAttributes, useCallback, useState,
} from "react";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import cls from "./PrimaryField.module.scss";

type InputAttrubutes = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface PrimaryFieldProps extends InputAttrubutes {
	className?: string;
	placeholder: string;
	value?: string;
	onChange?: (value: string) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	isSuccess?: boolean;
	type?: string;
	register: any;
}

export const PrimaryField: FC<PrimaryFieldProps> = ({
	className, placeholder, value, onChange, onBlur, errorMessage, type = "text", isSuccess, register, ...anotherProps
}) => {
	const [isEmty, setIsEmty] = useState(true);

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	}, [onChange]);

	const onBlurHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onBlur?.(e);

		if (!e.target.value) {
			setIsEmty(true);
		} else {
			setIsEmty(false);
		}
	}, [onBlur]);

	return (
		<div className={cn(cls.PrimaryField, {
			[cls.PrimaryField_error]: errorMessage,
			[cls.PrimaryField_success]: isSuccess,
			[cls.PrimaryField_emty]: !isEmty,
		}, [className])}
		>
			<span className={cls.PrimaryField__placeholder}>{placeholder}</span>
			<div className={cls.PrimaryField__wrapper}>
				<input
					className={cls.PrimaryField__input}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					{...register}
					{...anotherProps}
				/>
			</div>
			{/* <CSSTransition
				in={!!errorMessage}
				timeout={4000}
				unmountOnExit
				classNames={{
					// appear: cls.PrimaryField__error_appear,
					// appearActive: cls.PrimaryField__error_appear_active,
					// appearDone: cls.PrimaryField__error_appear_done,
					enter: cls.PrimaryField__error_enter,
					enterActive: cls.PrimaryField__error_enter_active,
					// enterDone: cls.PrimaryField__error_enter_done,
					exit: cls.PrimaryField__error_exit,
					exitActive: cls.PrimaryField__error_exit_active,
					// exitDone: cls.PrimaryField__error_exit_done,
				}}
			>
				<span className={cls.PrimaryField__error}>{errorMessage}</span>
			</CSSTransition> */}
			<span className={cls.PrimaryField__error}>{errorMessage}</span>
		</div>
	);
};
