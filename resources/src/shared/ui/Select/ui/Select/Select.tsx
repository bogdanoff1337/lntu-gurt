import {
	FC, MouseEventHandler, useEffect, useRef, useState,
} from "react";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import { OptionType, SelectProps } from "../../model/types/types";
import { Option } from "../Option/Option";
import ArrowDown from "./arrowDown.svg?react";
import cls from "./Select.module.scss";

export const Select: FC<SelectProps> = (props) => {
	const {
		options,
		placeholder,
		selected,
		onSelect,
		onClose,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
				// eslint-disable-next-line
				isOpen && onClose?.();
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [onClose]);

	useEffect(() => {
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return;

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				setIsOpen((prev) => !prev);
			}
		};
		placeholderEl.addEventListener("keydown", handleEnterKeyDown);

		// eslint-disable-next-line
		return () => {
			placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, []);

	const handleOptionClick = (value: OptionType["value"]) => {
		setIsOpen(false);
		onSelect?.(value);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prev) => !prev);
	};

	const mods = {
		[cls.Select_active]: isOpen,
		[cls.Select_nonActive]: !isOpen,
	};

	return (
		<div
			className={cn(cls.Select, mods, [])}
			ref={rootRef}
			onClick={handlePlaceHolderClick}
		>
			<div
				className={cls.Select__placeholder}
				data-selected={!!selected?.value}
				role="button"
				tabIndex={0}
				ref={placeholderRef}
			>
				{selected?.title || placeholder}
			</div>
			<ArrowDown className={cls.Select__arrow} />
			<ul className={cls.Select__options}>
				{options.map((option) => (
					<Option
						key={option.value}
						option={option}
						onClick={handleOptionClick}
					/>
				))}
			</ul>
		</div>
	);
};
