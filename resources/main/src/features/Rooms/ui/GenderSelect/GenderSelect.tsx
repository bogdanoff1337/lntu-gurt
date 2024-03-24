import queryString from "query-string";
import { FC, useCallback, useMemo } from "react";
import { entityRoomsActions } from "@/entities/Rooms";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";

interface GenderSelectProps {
	className?: string;
}

const optionModal = [
	{
		id: 1,
		slug: "Чоловіча",
	},
	{
		id: 2,
		slug: "Жіноча",
	},
];

export const GenderSelect: FC<GenderSelectProps> = ({ className }) => {
	// const { dormitory_id, faculty_id, gender } = useQueryParams();
	const dispatch = useAppDispatch();

	const onUpdateQP = useCallback((id: number) => {
		const genderById = optionModal.find((item) => item.id === id)?.slug;
		const { dormitory_id, faculty_id, gender } = queryString.parse(window.location.search);

		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id: faculty_id as string,
			dormitory_id: dormitory_id as string,
			gender: genderById as string,
		}));

		updateUrlParams({ gender: genderById });
	}, [dispatch]);

	const idByGender = useMemo(() => {
		const { dormitory_id, faculty_id, gender } = queryString.parse(window.location.search);
		return optionModal.find((item) => item.slug === gender)?.id;
	}, []);

	return (
		<Select
			className={className}
			id={idByGender!}
			options={optionModal}
			onUpdateQP={onUpdateQP}
			placeholder="Оберіть стать"
		/>
	);
};
