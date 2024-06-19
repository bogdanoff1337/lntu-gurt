import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
	FC, memo, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { PrimaryField } from "@/shared/ui/Fields";
import { Option } from "../Option/Option";
import ArrowDown from "./assets/arrow-down.svg?react";
import cls from "./SelectSecondary.module.scss";

export interface SelectSecondaryProps {
	id?: number | null;
	options?: OptionType[];
	placeholder?: string;
	onChange?: (id: number) => void;
	className?: string;
	SlotField?: FC<any>;
	renderIcon?: boolean;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	readOnly?: boolean;
}

export interface OptionType {
	id: number;
	slug: string;
	address?: string;
}

export const SelectSecondary: FC<SelectSecondaryProps> = memo(({
	options, placeholder, id, onChange, className, SlotField, renderIcon, Icon, readOnly,
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

	const onOptionClick = useCallback((id: number) => () => {
		if (id !== activeSelectId) {
			setActiveSelectId(id);
			onChange?.(id);
		}

		setIsOpen((prev) => !prev);
	}, [activeSelectId, onChange]);

	const onClickSummary = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const selectedOption = useMemo(() => {
		return options?.find((option) => Number(option.id) === activeSelectId);
	}, [activeSelectId, options]);

	const optionsItems = useMemo(() => {
		return options?.map((option) => (
			<Option
				key={option.id}
				option={option}
				onClick={onOptionClick(Number(option.id))}
				SlotField={SlotField}
				activeSelectId={activeSelectId}
			/>
		));
	}, [SlotField, activeSelectId, onOptionClick, options]);

	return (
		<div
			className={clsx(cls.SelectSecondary, {
				[cls.SelectSecondary_active]: isOpen,
				[cls.SelectSecondary_nonActive]: !isOpen,
			}, [className])}
			ref={rootRef}
		>
			<div className={cls.SelectSecondary__summary}>
				<PrimaryField
					className={cls.SelectSecondary__field}
					onClick={onClickSummary}
					tabIndex={0}
					role="button"
					value={selectedOption ? selectedOption.slug : ""}
					placeholder={placeholder}
					renderIcon={renderIcon}
					Icon={Icon}
					readOnly={readOnly}
					inputMode="none"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
				/>
				<Transition
					show={renderIcon}
					as="div"
					className={cls.SelectSecondary__iconWrapper}
					enter={cls.SelectSecondary__iconWrapper_enter}
					enterFrom={cls.SelectSecondary__iconWrapper_enterFrom}
					enterTo={cls.SelectSecondary__iconWrapper_enterTo}
					leave={cls.SelectSecondary__iconWrapper_leave}
					leaveFrom={cls.SelectSecondary__iconWrapper_leaveFrom}
					leaveTo={cls.SelectSecondary__iconWrapper_leaveTo}
				>
					<ArrowDown className={cls.SelectSecondary__arrow} />
				</Transition>

			</div>

			<ul
				className={cls.SelectSecondary__options}
				ref={optionsRef}
			>
				{optionsItems}
			</ul>
		</div>
	);
});
