import {
	FC, memo, useCallback, useMemo,
} from "react";
import { entityGendersModal } from "@/entities/Genders";
import { entityRoomsActions } from "@/entities/Rooms";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";

interface GenderSelectProps {
	className?: string;
}

export const GenderSelect: FC<GenderSelectProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const { dormitory_id, faculty_id, gender } = useQueryParams();

	const onChange = useCallback((id: number) => {
		const genderById = entityGendersModal.find((item) => item.id === id)!.slug;

		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id,
			dormitory_id,
			gender: genderById,
		}));

		updateUrlParams({ gender: genderById });
	}, [dispatch, dormitory_id, faculty_id]);

	const idByGender = useMemo(() => {
		return entityGendersModal.find((item) => item.slug === gender)?.id;
	}, [gender]);

	return (
		<Select
			className={className}
			id={idByGender}
			options={entityGendersModal}
			onChange={onChange}
			placeholder="Оберіть стать"
		/>
	);
});
