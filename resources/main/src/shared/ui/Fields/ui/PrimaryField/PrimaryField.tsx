import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
	ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from "react";
import cls from "./PrimaryField.module.scss";

type InputAttrubutes = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface PrimaryFieldProps extends InputAttrubutes {
	className?: string;
	placeholder?: string;
	value?: string | null;
	onChange?: (value: string) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	isSuccess?: boolean;
	type?: string;
	readOnly?: boolean;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	renderIcon?: boolean;
	isFeature?: boolean;
}

export const PrimaryField: FC<PrimaryFieldProps> = ({
	className, placeholder, value, onChange, onBlur, errorMessage, type = "text", isSuccess,
	Icon, renderIcon = true, readOnly, isFeature, ...anotherProps
}) => {
	const [isEmty, setIsEmty] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	}, [onChange]);

	const onBlurHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onBlur?.(e);
	}, [onBlur]);

	useEffect(() => {
		setIsEmty(!value);
	}, [value]);

	return (
		<div className={clsx(cls.PrimaryField, {
			[cls.PrimaryField_error]: errorMessage,
			[cls.PrimaryField_success]: isSuccess,
			[cls.PrimaryField_emty]: !isEmty,
			[cls.PrimaryField_readOnly]: readOnly,
		}, [className])}
		>
			<span className={cls.PrimaryField__placeholder}>{placeholder}</span>
			<div className={cls.PrimaryField__wrapper}>
				<input
					ref={inputRef}
					className={cls.PrimaryField__input}
					type={type}
					placeholder={placeholder}
					value={value || ""}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					{...anotherProps}
				/>
				<Transition
					show={renderIcon}
					as="div"
					className={cls.PrimaryField__iconWrapper}
					enter={cls.PrimaryField__iconWrapper_enter}
					enterFrom={cls.PrimaryField__iconWrapper_enterFrom}
					enterTo={cls.PrimaryField__iconWrapper_enterTo}
					leave={cls.PrimaryField__iconWrapper_leave}
					leaveFrom={cls.PrimaryField__iconWrapper_leaveFrom}
					leaveTo={cls.PrimaryField__iconWrapper_leaveTo}
				>
					{Icon && <Icon className={cls.PrimaryField__icon} />}
				</Transition>
			</div>
			<span className={cls.PrimaryField__error}>{errorMessage}</span>
		</div>
	);
};
