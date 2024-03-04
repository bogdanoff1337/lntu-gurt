import {
	FC, MouseEventHandler, useEffect, useRef, useState,
} from "react";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import { OptionType, SelectProps } from "../../model/types/types";
import { Option } from "../Option/Option";
import ArrowDown from "./assets/arrow-down.svg?react";
import cls from "./Select.module.scss";

export const Select: FC<SelectProps> = (props) => {
	const {
		options, placeholder, selectedValue, onSelect, onClose,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				e.target instanceof Node && !rootRef.current?.contains(e.target)
			) {
				// eslint-disable-next-line
                isOpen && onClose?.();
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isOpen, onClose]);

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

	const handleOptionClick = (value: OptionType["slug"]) => () => {
		onSelect?.(value);
		setIsOpen((prev) => !prev);
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
		>
			<div className={cls.Select__box} onClick={handlePlaceHolderClick}>
				<div
					className={cls.Select__placeholder}
					role="button"
					data-selected={!!selectedValue}
					tabIndex={0}
					ref={placeholderRef}
				>
					{selectedValue || placeholder}
				</div>
				<ArrowDown className={cls.Select__arrow} />
			</div>
			<ul className={cls.Select__options}>
				{options.map((option) => (
					<Option
						key={option.slug}
						option={option}
						onClick={handleOptionClick(option.slug)}
					/>
				))}
			</ul>
		</div>
	);
};
