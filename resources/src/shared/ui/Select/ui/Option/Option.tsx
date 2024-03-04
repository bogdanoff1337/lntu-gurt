import {
	FC, useEffect, useRef,
} from "react";
import { OptionType } from "../../model/types/types";
import cls from "./Option.module.scss";

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType["slug"]) => void;
};

export const Option: FC<OptionProps> = ({ option: { id, slug, adress }, onClick }) => {
	const optionRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const option = optionRef.current;

		if (!option) {
			return;
		}

		const handleEnterKeyDown = (e: KeyboardEvent) => {
			if (document.activeElement === option && e.key === "Enter") {
				onClick(slug);
			}
		};

		option.addEventListener("keydown", handleEnterKeyDown);

		// eslint-disable-next-line
	    return () => {
			option.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, [slug, onClick]);

	return (
		<li
			className={cls.Option}
			value={slug}
			onClick={() => onClick(slug)}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			ref={optionRef}
		>
			{`${slug}: ${adress}`}
		</li>
	);
};
