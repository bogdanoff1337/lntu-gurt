import clsx from "clsx";
import {
	FC, memo, useEffect, useRef,
} from "react";
import { OptionType } from "../Select/Select";
import cls from "./Option.module.scss";

interface OptionProps {
	option: OptionType;
	onClick: () => void;
	SlotField?: FC<any>;
	activeSelectId: number | null;
    className?: string
}

export const Option: FC<OptionProps> = memo(({
	option, onClick, SlotField, activeSelectId, className
}) => {
	const optionRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const option = optionRef.current;

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (document.activeElement === option && e.key === "Enter") {
				onClick();
			}
		};

		if (option) {
			option.addEventListener("keydown", handleEnterKeyDown);

			return () => {
				option.removeEventListener("keydown", handleEnterKeyDown);
			};
		}
	}, [onClick]);

	return (
		<li
			className={clsx(cls.Option, {
				[cls.Option_active]: option.id === activeSelectId,
			}, [className])}
			onClick={() => onClick()}
			tabIndex={0}
			ref={optionRef}

		>
			{SlotField && <SlotField option={option} /> || option.slug}
		</li>
	);
});
