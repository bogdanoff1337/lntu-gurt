import { FC, ReactElement } from "react";

export type SelectProps = {
	selectedValue: string | null;
	options: OptionType[];
	placeholder?: string;
	onSelect?: (selected: string) => void;
	onClose?: () => void;
	SelectShell: FC<OptionType>;
};
export type OptionType = {
	data: Gurt[];
};

export type Gurt = {
	id: string;
	slug: string;
	address: string;
};
