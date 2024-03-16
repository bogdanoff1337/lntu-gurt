import { FC, useCallback } from "react";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import { DormField } from "./DormField";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { entityRoomsActions } from "@/entities/Rooms";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface DormSelectProps {
	className?: string;
}

const optionModal = [
	{
		id: 1,
		slug: "Гуртожиток №1",
		address: "м. Луцьк, вул. С Ковалевської,29",
	},
	{
		id: 2,
		slug: "Гуртожиток №2",
		address: "м. Луцьк, вул. С Ковалевської,29",
	},
	{
		id: 3,
		slug: "Гуртожиток №3",
		address: "м. Луцьк, вул. С Ковалевської,29",
	},
];

export const DormSelect: FC<DormSelectProps> = ({ className }) => {
	const { dormitory_id, faculty_id, gender } = useQueryParams();
	const dispatch = useAppDispatch();


	const onUpdateQP = useCallback((id: number) => {
		updateUrlParams({ dormitory_id: id });

		dispatch(entityRoomsActions.getRoomsByParams({ faculty_id: +faculty_id!, dormitory_id: id, gender: gender as string }));
	}, []);

	return (
		<Select
			className={className}
			id={+dormitory_id!}
			options={optionModal}
			onUpdateQP={onUpdateQP}
			placeholder="Оберіть гуртожиток"
			SlotField={DormField}
		/>
	);
};
