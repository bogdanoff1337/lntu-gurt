import {
	FC, MouseEventHandler, useEffect, useRef,
} from "react";
import { OptionType } from "../../model/types/types";
import cls from "./Option.module.scss";

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType["value"]) => void;
};

export const Option: FC<OptionProps> = (props) => {
	const {
		option: { value, title },
		onClick,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick = (clickedValue: OptionType["value"]): MouseEventHandler<HTMLLIElement> => () => {
		onClick(clickedValue);
	};

	useEffect(() => {
		const option = optionRef.current;

		if (!option) {
			return;
		}

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === "Enter") {
				onClick(value);
			}
		};

		option.addEventListener("keydown", handleEnterKeyDown);

		// eslint-disable-next-line
        return () => {
			option.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, [value, onClick]);

	return (
		<li
			className={cls.Option}
			value={value}
			onClick={handleClick(value)}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			ref={optionRef}
		>
			{title}
		</li>
	);
};
