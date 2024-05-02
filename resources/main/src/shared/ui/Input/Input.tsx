import clsx from "clsx";
import {
	ChangeEvent, FC, InputHTMLAttributes, memo,
} from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	type?: string;
	placeholder?: string;
	label?: string;
	readOnly?: boolean;
	onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = memo(({
	className,
	value,
	placeholder,
	type = "text",
	readOnly,
	onChange,
	disabled,
}) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<input
			className={clsx(cls.Input, [className])}
			type={type}
			value={value}
			onChange={onChangeHandler}
			placeholder={placeholder}
			readOnly={readOnly}
			disabled={disabled}
		/>
	);
});
