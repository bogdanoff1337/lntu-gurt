import {
	ChangeEvent, FC, useCallback,
} from "react";
import { CSSTransition } from "react-transition-group";
import { classNames } from "../../../../lib/classNames/classNames";
import cls from "./PrimaryField.module.scss";

interface PrimaryFieldProps {
	className?: string;
	placeholder: string;
	value: string;
	onChange?: (value: string) => void;
	errorMessage?: string;
}

export const PrimaryField: FC<PrimaryFieldProps> = ({
	className, placeholder, value, onChange, errorMessage,
}) => {
	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	}, [onChange]);

	return (
		<div className={classNames(cls.PrimaryField, {
			[cls.PrimaryField_error]: errorMessage,
		}, [className])}
		>
			<span className={cls.PrimaryField__placeholder}>{placeholder}</span>
			<div className={cls.PrimaryField__wrapper}>
				<input
					className={cls.PrimaryField__input}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={onChangeHandler}
					// {...props}
				/>
			</div>
			<CSSTransition
				in={!!errorMessage}
				timeout={300}
				unmountOnExit
				classNames={{
					appear: cls.PrimaryField__error_appear,
					appearActive: cls.PrimaryField__error_appear_active,
					appearDone: cls.PrimaryField__error_appear_done,
					enter: cls.PrimaryField__error_enter,
					enterActive: cls.PrimaryField__error_enter_active,
					enterDone: cls.PrimaryField__error_enter_done,
					exit: cls.PrimaryField__error_exit,
					exitActive: cls.PrimaryField__error_exit_active,
					exitDone: cls.PrimaryField__error_exit_done,
				}}
			>
				<span className={cls.PrimaryField__error}>{errorMessage}</span>
			</CSSTransition>
		</div>
	);
};
