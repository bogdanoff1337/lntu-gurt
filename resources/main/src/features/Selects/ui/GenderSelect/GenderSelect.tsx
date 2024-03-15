// import { FC, useCallback } from "react";
// import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
// import { Select } from "@/shared/ui/Select/ui/Select/Select";

// interface GenderSelectProps {
// 	className?: string;
// 	id: number;
// }

// const optionModal = [
// 	{
// 		id: 1,
// 		slug: "Чоловіча",
// 	},
// 	{
// 		id: 2,
// 		slug: "Жіноча",
// 	},
// ];

// export const GenderSelect: FC<GenderSelectProps> = ({ className }) => {
// 	const onUpdateQP = useCallback((id: number) => {
// 		updateUrlParams({ gender: id });
// 	}, []);

// 	return (
// 		<Select
// 			id={id}
// 			options={optionModal}
// 			SlotField={}
// 			onUpdateQP={onUpdateQP}
// 		/>
// 	);
// };
