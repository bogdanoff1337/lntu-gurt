import {
	ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState,
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
}

export const PrimaryField: FC<PrimaryFieldProps> = ({
	className, placeholder, value, onChange, onBlur, errorMessage, type = "text", isSuccess, ...anotherProps
}) => {
	const [isEmty, setIsEmty] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		if (inputRef.current?.value) {
			setIsEmty(false);
		}
	}, []);

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
					ref={inputRef}
					className={cls.PrimaryField__input}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					{...anotherProps}
				/>
			</div>
			<span className={cls.PrimaryField__error}>{errorMessage}</span>
		</div>
	);
};
