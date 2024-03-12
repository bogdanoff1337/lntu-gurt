import {
	FC, useEffect, useRef,
} from "react";
import { OptionType } from "../../model/types/types";
import cls from "./Option.module.scss";

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType["value"]) => void;
};

export const Option: FC<OptionProps> = ({ option: { id, value, address }, onClick }) => {
	const optionRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const option = optionRef.current;

		if (!option) {
			return;
		}

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (document.activeElement === option && e.key === "Enter") {
				onClick(value);
			}
		};

		option.addEventListener("keydown", handleEnterKeyDown);

		// eslint-disable-next-line
	    return () => {
			option.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, [onClick, value]);

	return (
		<li
			className={cls.Option}
			value={value}
			onClick={() => onClick(value)}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			ref={optionRef}
		>
			<span className={cls.Option__dorm}>{value}:</span> {address}
		</li>
	);
};
