import { createSelector } from "@reduxjs/toolkit";
import { entityRoomsSelectors } from "@/entities/Rooms";
import { getMainRoutePath } from "@/shared/config/routes/path";

export const getBreadcrumbs = createSelector([entityRoomsSelectors.getEntityRoomsData], (entityRoomsData) => {

	return [
		{
			id: 1,
			//! hardcore
			title: (
				<>
					Факультети: <b>{entityRoomsData?.breadcrumbs.slug_short}</b>
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
