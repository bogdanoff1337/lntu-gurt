import { createSelector } from "@reduxjs/toolkit";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { entityRoomsSelectors } from "@/entities/Rooms";

export const getBreadcrumbs = createSelector([entityRoomsSelectors.getEntityRoomsData], (entityRoomsData) => {
	return [
		{
			id: 1,
			//! hardcore
			title: (
				<>
					Факультети: <b>{entityRoomsData && entityRoomsData[0].faculty.slug_short}</b>
				</>
			),
			to: getMainRoutePath(),
		},
		{
			id: 2,
			title: "Кімнати",
		},
	];
});
