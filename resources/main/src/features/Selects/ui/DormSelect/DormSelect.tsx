import { FC, useCallback } from "react";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";

interface DormSelectProps {
	className?: string;
	id: number;
}

const optionModal = [
	{
		id: 1,
		slug: "qweqweqwe",
		address: "eewe",
	},
	{
		id: 2,
		slug: "wwww",
		address: "wqeeee",
	},
	{
		id: 3,
		slug: "eqwewq",
		address: "eee",
	},
];

export const DormSelect: FC<DormSelectProps> = ({ className, id }) => {
	const onUpdateQP = useCallback((id: number) => {
		updateUrlParams({ dormitory_id: id });
	}, []);

	return (
		<Select
			id={id}
			options={optionModal}
			onUpdateQP={onUpdateQP}
		/>
	);
};
