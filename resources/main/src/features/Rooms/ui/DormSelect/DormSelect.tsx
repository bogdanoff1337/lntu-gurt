import queryString from "query-string";
import {
	FC, memo, useCallback, useEffect,
} from "react";
import { useSelector } from "react-redux";
import { entityDormitoriesActions, entityDormitoriesSelectors } from "@/entities/Dormitories";
import { entityRoomsActions } from "@/entities/Rooms";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { DormField } from "./DormField";
import { ThirdSelect } from "@/shared/ui/Select";

interface DormSelectProps {
	className?: string;
}

export const DormSelect: FC<DormSelectProps> = memo(({ className }) => {
	const dormitoriesData = useSelector(entityDormitoriesSelectors.getData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!dormitoriesData) {
			dispatch(entityDormitoriesActions.getAllDormitories());
		}
	}, [dispatch, dormitoriesData]);

	const onChange = useCallback((id: number) => {
		const { gender, faculty_id } = queryString.parse(window.location.search);
		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id,
			dormitory_id: `${id}`,
			gender,
		}));

		updateUrlParams({ dormitory_id: id });
	}, [dispatch]);

	const { dormitory_id } = queryString.parse(window.location.search);

	return (
		<ThirdSelect
			className={className}
			id={+dormitory_id!}
			options={dormitoriesData}
			onChange={onChange}
			placeholder="Оберіть гуртожиток"
			SlotField={DormField}
		/>
	);
});
