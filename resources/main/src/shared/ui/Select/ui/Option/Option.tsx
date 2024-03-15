import {
	FC, useEffect, useMemo, useRef,
} from "react";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import { OptionType } from "../Select/Select";
import cls from "./Option.module.scss";

type OptionProps = {
	option: OptionType;
	onClick: (slug: string) => void;
};

export const Option: FC<OptionProps> = ({ option: { id, slug, address }, onClick }) => {
	const optionRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const option = optionRef.current;

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (document.activeElement === option && e.key === "Enter") {
				onClick(slug);
			}
		};

		if (option) {
			option.addEventListener("keydown", handleEnterKeyDown);

			return () => {
				option.removeEventListener("keydown", handleEnterKeyDown);
			};
		}
	}, [onClick, slug]);

	return (
		<li
			className={cn(cls.Option, {
				[cls.Option_active]: id === slug,
			}, [])}
			onClick={() => onClick(slug)}
			tabIndex={0}
			ref={optionRef}
		>
			<b className={cls.Option__bold}>{slug}:</b> {address}
		</li>
	);
};
