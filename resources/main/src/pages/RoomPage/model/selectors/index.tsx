import { createSelector } from "@reduxjs/toolkit";
import { entityRoomSelectors } from "@/entities/Room";
import { getMainRoutePath, getRoomsRoutePath } from "@/shared/config/routes/path";
import { generateQueryString } from "@/shared/lib/generateQueryString";

export const getBreadcrumbs = createSelector([entityRoomSelectors.getData], (entityRoomData) => {
	return [
		{
			id: 1,
			title: (
				<>
					Факультети{entityRoomData ? <>: <b>{entityRoomData?.faculty.slug_short}</b></> : null}
				</>
			),
			to: getMainRoutePath(),
		},
		{
			id: 2,
			title: "Кімнати",
			to: {
				pathname: getRoomsRoutePath(),
				search: generateQueryString({
					faculty_id: entityRoomData?.faculty?.id,
					dormitory_id: entityRoomData?.dormitory?.id,
					gender: entityRoomData?.gender,
				}),
			},
		},
		{
			id: 3,
			title: `Кімната${entityRoomData?.number ? `: ${entityRoomData?.number}` : ""}`,
		},
	];
});
