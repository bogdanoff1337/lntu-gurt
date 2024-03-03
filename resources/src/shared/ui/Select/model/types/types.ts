export type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	status?: "default" | "invalid";
	onSelect?: (selected: OptionType["value"]) => void;
	onClose?: () => void;
};

export type OptionType = {
	title: string;
	value: string
};
