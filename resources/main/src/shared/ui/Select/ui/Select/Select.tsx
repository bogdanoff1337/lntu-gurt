import clsx from "clsx";
import {
	FC, memo, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { Option } from "../Option/Option";
import ArrowDown from "./assets/arrow-down.svg?react";
import cls from "./Select.module.scss";

interface SelectProps {
	id?: number | null;
	options?: OptionType[];
	placeholder?: string;
	onChange?: (id: number) => void;
	className?: string;
	SlotField?: FC<any>;
}

export interface OptionType {
	id: number;
	slug: string;
	address?: string;
}

export const Select: FC<SelectProps> = memo(({
	options, placeholder, id, onChange, className, SlotField,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSelectId, setActiveSelectId] = useState<number | null>(id || null);
	const rootRef = useRef<HTMLDivElement>(null);
	const summaryRef = useRef<HTMLDivElement>(null);
	const optionsRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const onOverlayClick = (e: MouseEvent) => {
			if (
				e.target instanceof Node && !rootRef.current?.contains(e.target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", onOverlayClick);

		return () => {
			window.removeEventListener("click", onOverlayClick);
		};
	}, [isOpen]);

	useEffect(() => {
		const summaryEl = summaryRef.current;

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				setIsOpen((prev) => !prev);
			}
		};

		if (summaryEl) {
			summaryEl.addEventListener("keydown", handleEnterKeyDown);

			return () => {
				summaryEl.removeEventListener("keydown", handleEnterKeyDown);
			};
		}
	}, []);

	const onOptionClick = (id: number) => () => {
		if (id !== activeSelectId) {
			setActiveSelectId(id);
			onChange && onChange(id);
		}

		setIsOpen((prev) => !prev);
	};

	const onClickSummary = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const selectedOption = useMemo(() => {
		return options?.find((option) => Number(option.id) === activeSelectId);
	}, [activeSelectId, options]);

	return (
		<div
			className={clsx(cls.Select, {
				[cls.Select_active]: isOpen,
				[cls.Select_nonActive]: !isOpen,
			}, [className])}
			ref={rootRef}
		>
			<div
				className={cls.Select__summary}
				onClick={onClickSummary}
				tabIndex={0}
				ref={summaryRef}
				role="button"
			>
				<div
					className={cls.Select__placeholder}
				>
					{selectedOption && (SlotField && <SlotField option={selectedOption} /> || selectedOption.slug) || placeholder}
				</div>
				<ArrowDown className={cls.Select__arrow} />
			</div>
			<ul
				className={cls.Select__options}
				ref={optionsRef}
			>
				{options?.map((option) => (
					<Option
						key={option.id}
						option={option}
						onClick={onOptionClick(Number(option.id))}
						SlotField={SlotField}
						activeSelectId={activeSelectId}
					/>
				))}
			</ul>
		</div>
	);
});
