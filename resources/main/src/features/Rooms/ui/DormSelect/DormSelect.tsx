import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { entityDormitoriesActions, entityDormitoriesSelectors } from "@/entities/Dormitories";
import { entityRoomsActions } from "@/entities/Rooms";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import { DormField } from "./DormField";

interface DormSelectProps {
	className?: string;
}

export const DormSelect: FC<DormSelectProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const { dormitory_id, faculty_id, gender } = useQueryParams();
	const dormitoriesData = useSelector(entityDormitoriesSelectors.getData);

	useEffect(() => {
		dispatch(entityDormitoriesActions.getAllDormitories());
	}, [dispatch]);

	const onUpdateQP = useCallback((id: number) => {
		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id: faculty_id as string,
			dormitory_id: id,
			gender: gender as string,
		}));

		updateUrlParams({ dormitory_id: id });
	}, [dispatch, faculty_id, gender]);

	return (
		<Select
			className={className}
			id={+dormitory_id!}
			options={dormitoriesData}
			onUpdateQP={onUpdateQP}
			placeholder="Оберіть гуртожиток"
			SlotField={DormField}
		/>
	);
};
