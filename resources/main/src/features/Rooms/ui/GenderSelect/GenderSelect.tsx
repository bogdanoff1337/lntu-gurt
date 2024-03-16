import { FC, useCallback, useMemo } from "react";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { entityRoomsActions } from "@/entities/Rooms";

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
   const { dormitory_id, faculty_id, gender } = useQueryParams();
	const dispatch = useAppDispatch();
   
	const onUpdateQP = useCallback((id: number) => {
      const genderById = optionModal.find((item) => item.id === id)?.slug;

		updateUrlParams({ gender: genderById });

      dispatch(entityRoomsActions.getRoomsByParams({ faculty_id: +faculty_id!, dormitory_id: +dormitory_id!, gender: genderById as string }));

	}, []);

   const idByGender = useMemo(() => {
      return optionModal.find((item) => item.slug === gender)?.id
   }, [])


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

