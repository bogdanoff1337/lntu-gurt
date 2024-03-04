export type SelectProps = {
	selectedValue: string | null;
	options: OptionType[];
	placeholder?: string;
	onSelect?: (selected: string) => void;
	onClose?: () => void;
};

export type OptionType = {
	id: string
	slug: string;
	adress: string;
};
